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
  const tree: Path = createPath('', origin, iconForPath(seed, '/'));

  for (const path of paths) {
    if (path.startsWith('#')) {
      tree.fragments.push(path.slice(1));
      continue;
    }

    const segments = path.split('/');

    segments.reduce((node, segment, i) => {
      const [plainSegment, fragment] = segment.split('#');
      const segmentPath = segments.slice(0, i + 1).join('/');
      node.children[plainSegment] ||= createPath(segmentPath, plainSegment, iconForPath(seed, path));

      if (fragment) {
        node.children[plainSegment].fragments.push(fragment);
      }

      return node.children[plainSegment];
    }, tree);
  }

  return tree;
};

export const sliceToWebsiteTree = (slice: DeepSeed): WebsiteTree => {
  const flat = flattenSeed(slice);
  const ids = Object.keys(flat).filter((id) => (!id.startsWith('_:') && id.includes('://')) || id.startsWith('/') || id.startsWith('#'));
  const maps = ids.reduce((acc: ByOrigin, id) => {
    const isAbsoluteFragment = id.startsWith('#');
    const isAbsolute = id.startsWith('/') || isAbsoluteFragment;
    const origin = isAbsolute ? '/' : originStr(id) + '/';
    const path = id.slice(isAbsoluteFragment ? 0 : origin.length);

    acc[origin] ||= [];

    if (path !== '')
      acc[origin].push(path);

    return acc;
  }, {});

  return Object.entries(maps).reduce((acc, [origin, paths]) => ({
    ...acc,
    [origin]: originToTree(flat, origin, paths),
  }), {} as WebsiteTree);
};
