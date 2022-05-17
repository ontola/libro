import {
  Literal,
  NamedNode,
  isLiteral,
  isNode,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  ELEMENT_DEFAULT,
  TDescendant,
  TElement,
  TText,
} from '@udecode/plate';
import { PlateStoreState } from '@udecode/plate-core/dist/types/PlateStore';
import { DeepRecord } from 'link-lib/dist-types/store/StructuredStore';
import { SomeNode } from 'link-lib/dist-types/types';

import elements from '../../../../ontology/elements';

type ElementsTypes = typeof elements.H1 | typeof elements.H2 | typeof elements.H3 | typeof elements.H4 | typeof elements.H5
  | typeof elements.H6 | typeof elements.Img | typeof elements.Li | typeof elements.Ol | typeof elements.P | typeof elements.Ul;

const elementsMap = {
  [elements.A.value]: 'a',
  [elements.Document.value]: ELEMENT_DEFAULT,
  [elements.Tip.value]: 'code',
  ['component:Button']: 'component:Button',
  [elements.H1.value]: 'h1',
  [elements.H2.value]: 'h2',
  [elements.H3.value]: 'h3',
  [elements.H4.value]: 'h4',
  [elements.H5.value]: 'h5',
  [elements.H6.value]: 'h6',
  [elements.Img.value]: 'img',
  [elements.Li.value]: 'li',
  [elements.Ol.value]: 'ol',
  [elements.P.value]: 'p',
  [elements.Ul.value]: 'ul',
};

interface ElementsDeepRecord extends DeepRecord {
  type: ElementsTypes;
  children: ElementsDeepRecord[];
}

interface AElement extends ElementsDeepRecord {
  type: typeof elements.A;
  'https://ns.ontola.io/core#href': SomeNode;
}

interface InnerText extends ElementsDeepRecord {
  type: typeof elements.InnerText;
  text: Literal;
  'https://ns.ontola.io/elements#bold': Literal;
}

const isInnerText = (value: ElementsDeepRecord): value is InnerText => value.type === elements.InnerText;
const isAElement = (value: ElementsDeepRecord): value is AElement => value.type === elements.A;

const isElementsRecord = (record: DeepRecord): record is ElementsDeepRecord =>
  typeof record[elements.children.value] !== 'undefined';

const memberPrefix = rdfx.ns('_').value;

const extractFieldIndex = (field: string): number => field.startsWith(memberPrefix)
  ? Number(field.split(memberPrefix).pop())
  : NaN;

const elementsChildren = (record: DeepRecord): DeepRecord[] => {
  const children = record[elements.children.value];

  if (children === undefined) {
    return [];
  }

  return Object.entries(children)
    .map<[number, DeepRecord]>(([field, value]) => [
      extractFieldIndex(field),
      value,
    ])
    .filter(([field]) => !isNaN(field))
    .sort(([a], [b]) => a! - b!)
    .map(([, value]) => value);
};

const toElementsDeepRecord = (deepRecord: DeepRecord): ElementsDeepRecord => {
  const record: ElementsDeepRecord = {
    _id: deepRecord._id,
    children: elementsChildren(deepRecord).map(toElementsDeepRecord),
    type: deepRecord[rdfx.type.value] as NamedNode,
  };

  if (isInnerText(record)) {
    const text = deepRecord[schema.text.value];

    if (isLiteral(text)) {
      record.text = text;
    }

    const bold = deepRecord[elements.bold.value];

    if (isLiteral(bold)) {
      record['https://ns.ontola.io/elements#bold'] = bold;
    }
  }

  if (isAElement(record)) {
    const href = deepRecord['https://ns.ontola.io/core#href'];

    if (isNode(href)) {
      record['https://ns.ontola.io/core#href'] = href;
    }
  }

  return record;
};

const toDescendant = (record: ElementsDeepRecord | InnerText | AElement): TDescendant => {
  if (isInnerText(record)) {
    const innerText: TText = {
      text: record.text!.value,
    };

    if (record['https://ns.ontola.io/elements#bold'] !== undefined) {
      innerText.bold = record['https://ns.ontola.io/elements#bold'].value === 'true';
    }

    return innerText;
  }

  const element: TElement = {
    children: record.children.map(toDescendant),
    type: elementsMap[record.type.value],
  };

  if (isAElement(record)) {
    element.url = record['https://ns.ontola.io/core#href'].value;
  }

  return element;
};

export const deepRecordToElementsValue = (record: DeepRecord): PlateStoreState['value'] => {
  if (!isElementsRecord(record)) {
    throw new Error('Record not an Elements record');
  }

  const elementsDeepRecord = toElementsDeepRecord(record);
  const child = toDescendant(elementsDeepRecord);

  return child.children;
};
