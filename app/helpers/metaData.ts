import { QuadPosition } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { Context } from 'koa';

import dbo from '../ontology/dbo';
import ontola from '../ontology/ontola';

// @ts-ignore
import { stripMarkdown } from './markdownHelper';

export const COVER_PREDICATES = [ontola.coverPhoto];
export const COVER_URL_PREDICATE = ontola.imgUrl1500x2000;
export const NAME_PREDICATES = [schema.name, rdfs.label];
export const TEXT_PREDICATES = [dbo.abstract, schema.description, schema.text];

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
  const tags = [{
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
  }] as TagProps[];

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

export const prerenderMetaTags = (ctx: Context, data: string): string => {
  const {
    manifest,
    request: { href },
  } = ctx;

  const quads = ([] as string[][]);
  let coverPhoto = '';
  let coverURL;
  let text;
  let name;

  data?.split('\n')?.forEach((line) => {
    if (line?.length > 0) {
      const quad = JSON.parse(line);

      if (quad[QuadPosition.subject] === href) {
        if (NAME_PREDICATES.find((pred) => pred.value === quad[QuadPosition.predicate])) {
          name = quad[QuadPosition.object];
        } else if (COVER_PREDICATES.find((pred) => pred.value === quad[QuadPosition.predicate])) {
          coverPhoto = quad[QuadPosition.object];
        } else if (TEXT_PREDICATES.find((pred) => pred.value === quad[QuadPosition.predicate])) {
          text = quad[QuadPosition.object];
        }
      } else {
        quads.push(quad);
      }
    }
  });

  if (coverPhoto.length > 0) {
    coverURL = quads
      .find(([subject, predicate]) => subject === coverPhoto && predicate === COVER_URL_PREDICATE.value)
      ?.[QuadPosition.object];
  }

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
