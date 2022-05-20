import {
  Literal,
  NamedNode,
  isLiteral,
  isNode,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { DeepRecord, SomeNode } from 'link-lib';

import elements from '../../../../../ontology/elements';
import ontola from '../../../../../ontology/ontola';
import { use } from '../use';

import { elementsChildren } from './elementsChildren';

type ElementsTypes =
  typeof elements.H1
  | typeof elements.H2
  | typeof elements.H3
  | typeof elements.H4
  | typeof elements.H5
  | typeof elements.H6
  | typeof elements.Img
  | typeof elements.Li
  | typeof elements.Ol
  | typeof elements.P
  | typeof elements.Ul;

export interface ElementsDeepRecord extends DeepRecord {
  type: ElementsTypes;
  children: ElementsDeepRecord[];
}

export interface AElement extends ElementsDeepRecord {
  type: typeof elements.A;
  'https://ns.ontola.io/core#href': SomeNode;
}

export interface PElement extends ElementsDeepRecord {
  type: typeof elements.P;
  'https://ns.ontola.io/elements#align': Literal;
  'https://ns.ontola.io/elements#indent': Literal;
}

export interface ActionItemElement extends ElementsDeepRecord {
  type: typeof elements.ActionItem;
  'https://ns.ontola.io/elements#checked': Literal;
}

export interface GridElement extends ElementsDeepRecord {
  type: typeof elements.Grid;
  'https://ns.ontola.io/elements#gap': Literal;
  'https://ns.ontola.io/elements#minWidth': Literal;
}

export interface NoteElement extends ElementsDeepRecord {
  type: typeof elements.Note;
}

export interface TipElement extends ElementsDeepRecord {
  type: typeof elements.Tip;
}

export interface PictureSetElement extends ElementsDeepRecord {
  type: typeof ontola.PictureSet;
  'https://ns.ontola.io/core#format/avif': SomeNode;
  'https://ns.ontola.io/core#format/apng': SomeNode;
  'https://ns.ontola.io/core#format/gif': SomeNode;
  'https://ns.ontola.io/core#format/jpg': SomeNode;
  'https://ns.ontola.io/core#format/png': SomeNode;
  'https://ns.ontola.io/core#format/svg': SomeNode;
  'https://ns.ontola.io/core#format/webp': SomeNode;
  'https://ns.ontola.io/core#imgUrl568x400': SomeNode;
  'https://ns.ontola.io/core#ariaLabel': Literal;
  'https://ns.ontola.io/elements#caption': Literal;
  'https://ns.ontola.io/elements#width': Literal;
}

export interface InnerText extends ElementsDeepRecord {
  type: typeof elements.InnerText;
  text: Literal;
  'https://ns.ontola.io/elements#bold': Literal;
  'https://ns.ontola.io/elements#italic': Literal;
  'https://ns.ontola.io/elements#underline': Literal;
  'https://ns.ontola.io/elements#color': Literal;
  'https://ns.ontola.io/elements#backgroundColor': Literal;
}

export type AnyElementsElement = InnerText
  | AElement
  | PElement
  | ActionItemElement
  | GridElement
  | NoteElement
  | TipElement
  | PictureSetElement;

export const isInnerText = (value: ElementsDeepRecord): value is InnerText =>
  value.type === elements.InnerText;

export const isAElement = (value: ElementsDeepRecord): value is AElement =>
  value.type === elements.A;

export const isPElement = (value: ElementsDeepRecord): value is PElement =>
  value.type === elements.P;

export const isActionItemElement = (value: ElementsDeepRecord): value is ActionItemElement =>
  value.type === elements.ActionItem;

export const isGridElement = (value: ElementsDeepRecord): value is GridElement =>
  value.type === elements.Grid;

export const isImgElement = (value: ElementsDeepRecord): value is PictureSetElement =>
  value.type === ontola.PictureSet;

export const isElementsRecord = (record: DeepRecord): record is ElementsDeepRecord =>
  record[rdfx.type.value] === elements.Document &&
  typeof record[elements.children.value] !== 'undefined';

const createAssignIfLiteral = (deepRecord: DeepRecord, record: ElementsDeepRecord) => (field: string, targetField: string = field) => {
  use(deepRecord[field], (v) => {
    if (isLiteral(v)) {
      record[targetField] = v;
    }
  });
};

const createAssignIfNode = (deepRecord: DeepRecord, record: ElementsDeepRecord) => (field: string) => {
  use(deepRecord[field], (v) => {
    if (isNode(v)) {
      record[field] = v;
    }
  });
};

export const toElementsDeepRecord = (deepRecord: DeepRecord): ElementsDeepRecord => {
  const record: ElementsDeepRecord = {
    _id: deepRecord._id,
    children: elementsChildren(deepRecord).map(toElementsDeepRecord),
    type: deepRecord[rdfx.type.value] as NamedNode,
  };

  const assignIfLiteral = createAssignIfLiteral(deepRecord, record);
  const assignIfNode = createAssignIfNode(deepRecord, record);

  if (isInnerText(record)) {
    assignIfLiteral(schema.text.value, 'text');
    assignIfLiteral(elements.bold.value);
    assignIfLiteral(elements.italic.value);
    assignIfLiteral(elements.underline.value);
    assignIfLiteral(elements.color.value);
    assignIfLiteral(elements.backgroundColor.value);
  }

  if (isAElement(record)) {
    assignIfNode('https://ns.ontola.io/core#href');
  }

  if (isPElement(record)) {
    assignIfLiteral('https://ns.ontola.io/elements#align');
    assignIfLiteral('https://ns.ontola.io/elements#indent');
  }

  if (isActionItemElement(record)) {
    assignIfLiteral('https://ns.ontola.io/elements#checked');
  }

  if (isGridElement(record)) {
    assignIfLiteral('https://ns.ontola.io/elements#gap');
    assignIfLiteral('https://ns.ontola.io/elements#minWidth');
  }

  if (isImgElement(record)) {
    assignIfNode(ontola.imgUrl568x400.value);
    assignIfNode(ontola['format/apng'].value);
    assignIfNode(ontola['format/avif'].value);
    assignIfNode(ontola['format/gif'].value);
    assignIfNode(ontola['format/jpg'].value);
    assignIfNode(ontola['format/png'].value);
    assignIfNode(ontola['format/svg'].value);
    assignIfNode(ontola['format/webp'].value);

    assignIfLiteral(ontola.ariaLabel.value);
    assignIfLiteral(elements.caption.value);
    assignIfLiteral(elements.width.value);
  }

  return record;
};
