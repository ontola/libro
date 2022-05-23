import { originStr } from '@rdfdev/iri';
import * as schema from '@ontologies/schema';

import {
  DeepSeed,
  Seed,
  Value,
} from '../../../../helpers/seed';
import argu from '../../../../ontology/argu';

import { flattenSeed } from './flattenSeed';

export interface Path {
  path: string;
  segment: string;
  children: { [segment: string]: Path };
  fragments: string[];
  icon: string | undefined;
}

export type WebsiteTree = { [origin: string]: Path };

type ByOrigin = { [origin: string]: string[] };

const unpack = (v: undefined | Value | Value[]): string | undefined => Array.isArray(v) ? v[0]?.v : v?.v;

const iconForPath = (seed: Seed, path: string): string | undefined => {
  const record = seed[path];

  if (record) {
    return unpack(record[argu.icon.value]) ?? unpack(record[schema.image.value]);
  }

  return undefined;
};

const createPath = (path: string, segment: string, icon: string | undefined): Path => ({
  fragments: [],
  path,
  segment,
  // eslint-disable-next-line sort-keys
  children: {},
  icon,
});

const originToTree = (seed: Seed, origin: string, paths: string[]): Path => {
  const tree: Path = createPath('/', origin, iconForPath(seed, '/'));
  const trim = (path: string): string => origin === '/' ? path : path.split(origin).pop()!;

  for (const path of paths) {
    const [plainPath, _] = trim(path).split('#');
    const [_root, ...segments] = plainPath.split('/');

    segments.reduce((node, segment) => {
      node.children[segment] ||= createPath(path, segment, iconForPath(seed, path));

      return node.children[segment];
    }, tree);
  }

  return tree;
};

export const sliceToWebsiteTree = (slice: DeepSeed): WebsiteTree => {
  const flat = flattenSeed(slice);
  const ids = Object.keys(flat).filter((id) => id.includes('://') || id.startsWith('/'));
  const maps = ids.reduce((acc: ByOrigin, id) => {
    const origin = id.startsWith('/') ? '/' : originStr(id);
    acc[origin] ||= [];

    if (id.slice(origin.length) !== '/')
      acc[origin].push(id);

    return acc;
  }, {});

  return Object.entries(maps).reduce((acc, [origin, paths]) => ({
    ...acc,
    [origin]: originToTree(flat, origin, paths),
  }), {} as WebsiteTree);
};
