import * as as from '@ontologies/as';
import rdf, { NamedNode, QuadPosition } from '@ontologies/core';
import * as dcterms from '@ontologies/dcterms';
import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import HttpStatus from 'http-status-codes';

import dbo from '../ontology/dbo';
import { Icon, WebManifest } from '../../Kernel/components/AppContext/WebManifest';
import ll from '../../Kernel/ontology/ll';
import ontola from '../../Kernel/ontology/ontola';

import { stripMarkdown } from './markdownHelper';

const raw = (list: NamedNode[]): string[] => list.map((n) => n.value);

export const ERROR_STATUS_CODES = {
  [ll.ErrorResource.value]: HttpStatus.BAD_REQUEST,
  [ontola.ns('errors/AccountLockedError').value]: HttpStatus.UNPROCESSABLE_ENTITY,
  [ontola.ns('errors/ConnectionFailedError').value]: HttpStatus.BAD_GATEWAY,
  [ontola.ns('errors/ExpiredError').value]: HttpStatus.GONE,
  [ontola.ns('errors/ForbiddenError').value]: HttpStatus.FORBIDDEN,
  [ontola.ns('errors/InvalidQueryErrorError"').value]: HttpStatus.BAD_REQUEST,
  [ontola.ns('errors/MissingIndexErrorError').value]: HttpStatus.BAD_REQUEST,
  [ontola.ns('errors/NoPasswordError').value]: HttpStatus.UNPROCESSABLE_ENTITY,
  [ontola.ns('errors/ParameterMissingError').value]: HttpStatus.UNPROCESSABLE_ENTITY,
  [ontola.ns('errors/RecordNotFoundError').value]: HttpStatus.NOT_FOUND,
  [ontola.ns('errors/RecordNotUniqueError').value]: HttpStatus.NOT_MODIFIED,
  [ontola.ns('errors/RoutingErrorError').value]: HttpStatus.NOT_FOUND,
  [ontola.ns('errors/UnauthorizedError').value]: HttpStatus.UNAUTHORIZED,
  [ontola.ns('errors/UnknownEmailError').value]: HttpStatus.UNPROCESSABLE_ENTITY,
  [ontola.ns('errors/UnpermittedParametersError').value]: HttpStatus.UNPROCESSABLE_ENTITY,
  [ontola.ns('errors/WrongPasswordError').value]: HttpStatus.UNPROCESSABLE_ENTITY,
};

export const ERROR_CLASSES = Object.keys(ERROR_STATUS_CODES).map((key) => rdf.namedNode(key));

export const COVER_PREDICATES = [ontola.coverPhoto];
export const COVER_URL_PREDICATES = [ontola.imgUrl1500x2000];
export const AVATAR_URL_PREDICATES = [ontola.imgUrl256x256];
export const IMAGE_PREDICATES = [schema.image];
export const NAME_PREDICATES = [
  schema.name,
  as.name,
  rdfs.label,
  foaf.name,
  sh.name,
  dcterms.title,
];
export const TEXT_PREDICATES = [dbo.abstract, schema.description, schema.text];

const COVER_PREDICATES_RAW = raw(COVER_PREDICATES);
const COVER_URL_PREDICATES_RAW = raw(COVER_URL_PREDICATES);
const AVATAR_URL_PREDICATES_RAW = raw(AVATAR_URL_PREDICATES);
const IMAGE_PREDICATES_RAW = raw(IMAGE_PREDICATES);
const NAME_PREDICATES_RAW = raw(NAME_PREDICATES);
const TEXT_PREDICATES_RAW = raw(TEXT_PREDICATES);

const APP_ICON_SIZE_PRIORITY = ['256x256', '192x192', '180x180', '152x152', '128x128', '64x64', '32x32', '16x16'];

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

interface MetaData {
  appIcon?: string;
  appName?: string;
  name?: string;
  url: string;
  text?: string;
  coverURL?: string;
  imageURL?: string;
}

export const getMetaTags = ({
  appIcon,
  appName,
  coverURL,
  imageURL,
  name,
  text,
  url,
}: MetaData): TagProps[] => {
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

  const img = coverURL ?? imageURL ?? appIcon;

  if (img) {
    tags.push({
      content: img,
      id: 'og:image',
      property: 'og:image',
      type: 'meta',
    }, {
      content: img,
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

const findLargestIcon = (icons: Icon[]): string | undefined => {
  for (const size of APP_ICON_SIZE_PRIORITY) {
    const iconSrc = icons.find((icon) => icon.sizes === size)?.src;

    if (iconSrc) {
      return iconSrc;
    }
  }

  return undefined;
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

export const prerenderMetaTags = (href: string, manifest: WebManifest, data: string): string => {
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
  const image = findValue(subjectQuads, IMAGE_PREDICATES_RAW);
  const imageQuads = quads.filter((q) => q[QuadPosition.subject] == image);
  const imageURL = findValue(imageQuads, AVATAR_URL_PREDICATES_RAW);
  const appIcon = findLargestIcon(manifest.icons ?? []);
  const strippedText = stripMarkdown(text)?.replace(/"/g, '&quot;');

  const metaTags = getMetaTags({
    appIcon,
    appName: manifest.short_name,
    coverURL,
    imageURL,
    name,
    text: strippedText,
    url: href,
  });

  return metaTags.map(prerenderMetaTag).join('\n          ');
};
