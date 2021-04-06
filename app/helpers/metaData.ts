import { QuadPosition } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { Context } from 'koa';

import dbo from '../ontology/dbo';
import ontola from '../ontology/ontola';

import { stripMarkdown } from './markdownHelper';

export const COVER_PREDICATES = [ontola.coverPhoto];
export const COVER_URL_PREDICATES = [ontola.imgUrl1500x2000];
export const NAME_PREDICATES = [schema.name, rdfs.label];
export const TEXT_PREDICATES = [dbo.abstract, schema.description, schema.text];

const COVER_PREDICATES_RAW = COVER_PREDICATES.map((n) => n.value);
const COVER_URL_PREDICATES_RAW = COVER_URL_PREDICATES.map((n) => n.value);
const NAME_PREDICATES_RAW = NAME_PREDICATES.map((n) => n.value);
const TEXT_PREDICATES_RAW = TEXT_PREDICATES.map((n) => n.value);

interface TagProps {
  children?: string;
  content?: string;
  href?: string;
  id?: string;
  itemProp?: string;
  name?: string;
  property?: string;
  rel?: string;
  type: string;
}

export const getMetaTags = ({
  appName,
  name,
  url,
  text,
  coverURL,
}: {
  appName?: string,
  name?: string,
  url: string,
  text?: string,
  coverURL?: string,
}): TagProps[] => {
  const title = [name, appName].filter(Boolean).join(' | ');
  const tags: TagProps[] = [{
    children: name && name.length > 0 ? name : appName,
    type: 'title',
  }, {
    href: url,
    itemProp: 'url',
    rel: 'canonical',
    type: 'link',
  }, {
    content: url,
    property: 'og:url',
    type: 'meta',
  }, {
    content: title,
    property: 'og:title',
    type: 'meta',
  }, {
    content: title,
    name: 'twitter:title',
    type: 'meta',
  }, {
    content: coverURL ? 'summary_large_image' : 'summary',
    name: 'twitter:card',
    type: 'meta',
  }];

  if (coverURL) {
    tags.push({
      content: coverURL,
      id: 'og:image',
      property: 'og:image',
      type: 'meta',
    }, {
      content: coverURL,
      name: 'twitter:image',
      type: 'meta',
    });
  }
  if (text) {
    tags.push({
      content: text,
      id: 'og:description',
      property: 'og:description',
      type: 'meta',
    }, {
      content: text,
      name: 'twitter:description',
      type: 'meta',
    }, {
      content: text,
      id: 'description',
      name: 'description',
      property: 'description',
      type: 'meta',
    });
  }

  return tags;
};

const prerenderMetaTag = (props: TagProps) => {
  const {
    children,
    type,
    ...tagProps
  } = props;

  if (type === 'title') {
    return `<title>${children}</title>`;
  }

  const attrs = Object.entries(tagProps).map(([key, value]) => (
    `${key.toLowerCase()}="${value}"`
  ));

  return `<${type} ${attrs.join(' ')}>`;
};

const findValue = (subjectQuads: string[], predicates: string[]): string | undefined => subjectQuads
  .filter((q) => predicates.includes(q[QuadPosition.predicate]))
  .find((q) => q[QuadPosition.object])
  ?.[QuadPosition.object];

export const prerenderMetaTags = (ctx: Context, data: string): string => {
  const {
    manifest,
    request: { href },
  } = ctx;

  const quads = data
    .split('\n')
    .map((line) => {
      try {
        return line && JSON.parse(line);
      } catch (e) {
        return undefined;
      }
    })
    .filter((q) => Array.isArray(q));
  const subjects = href.endsWith('/') ? [href, href.slice(0, -1)] : [href];
  const subjectQuads = quads.filter((quad) => subjects.includes(quad[QuadPosition.subject]));


  const text = findValue(subjectQuads, TEXT_PREDICATES_RAW);
  const name = findValue(subjectQuads, NAME_PREDICATES_RAW);
  const coverPhoto = findValue(subjectQuads, COVER_PREDICATES_RAW);
  const coverPhotoQuads = quads.filter((q) => q[QuadPosition.subject] == coverPhoto);
  const coverURL = findValue(coverPhotoQuads, COVER_URL_PREDICATES_RAW);

  const strippedText = stripMarkdown(text)?.replace(/"/g, '&quot;');

  const metaTags = getMetaTags({
    appName: manifest.short_name,
    coverURL,
    name,
    text: strippedText,
    url: href,
  });

  return metaTags.map(prerenderMetaTag).join('\n          ');
};
