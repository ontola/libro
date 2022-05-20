import rdf, { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import * as rdfx from '@ontologies/rdf';
import {
  ELEMENT_IMAGE,
  ELEMENT_LINK,
  ELEMENT_PARAGRAPH,
  ELEMENT_TODO_LI,
  TDescendant,
} from '@udecode/plate';
import { PlateStoreState } from '@udecode/plate-core/dist/types/PlateStore';
import { SomeNode } from 'link-lib';
import { DeepRecord } from 'link-lib/dist-types/store/StructuredStore';

import elements from '../../../../ontology/elements';
import ontola from '../../../../ontology/ontola';

import { elementsInverseMap } from './mapping';

const appendMarks = (desc: TDescendant, record: DeepRecord): DeepRecord => {
  if (desc.bold) {
    record[elements.bold.value] = rdf.literal(desc.bold);
  }

  if (desc.underline) {
    record[elements.underline.value] = rdf.literal(desc.underline);
  }

  if (desc.italic) {
    record[elements.italic.value] = rdf.literal(desc.italic);
  }

  if (desc.color) {
    record[elements.color.value] = rdf.literal(desc.color);
  }

  if (desc.backgroundColor) {
    record[elements.backgroundColor.value] = rdf.literal(desc.backgroundColor);
  }

  return record;
};

const appendOptionalNodeFields = (desc: TDescendant, record: DeepRecord): DeepRecord => {
  if (desc.type === ELEMENT_LINK) {
    record[ontola.href.value] = rdf.namedNode(desc.url);
  }

  if (desc.type === ELEMENT_PARAGRAPH) {
    if (desc.align) {
      record[elements.align.value] = rdf.literal(desc.align);
    }

    if (desc.indent) {
      record[elements.indent.value] = rdf.literal(desc.indent);
    }
  }

  if (desc.type === ELEMENT_TODO_LI) {
    if (desc.checked) {
      record[elements.checked.value] = rdf.literal(desc.checked);
    }
  }

  return record;
};

const appendOptionalImgFields = (desc: TDescendant, record: DeepRecord): DeepRecord => {
  if (desc.ariaLabel) {
    record[ontola.ariaLabel.value] = rdf.literal(desc.ariaLabel);
  }

  if ((desc.caption as TDescendant[])?.[0]?.text) {
    record[elements.caption.value] = rdf.literal((desc.caption as TDescendant[])[0].text);
  }

  if (desc.width) {
    record[elements.width.value] = rdf.literal(desc.width);
  }

  if (desc.avif) {
    record[ontola['format/avif'].value] = rdf.literal(desc.avif);
  }

  if (desc.svg) {
    record[ontola['format/svg'].value] = rdf.literal(desc.svg);
  }

  if (desc.png) {
    record[ontola['format/png'].value] = rdf.literal(desc.png);
  }

  if (desc.webp) {
    record[ontola['format/webp'].value] = rdf.literal(desc.webp);
  }

  if (desc.jpg) {
    record[ontola['format/jpg'].value] = rdf.literal(desc.jpg);
  }

  if (desc.apng) {
    record[ontola['format/apng'].value] = rdf.literal(desc.apng);
  }

  if (desc.gif) {
    record[ontola['format/gif'].value] = rdf.literal(desc.gif);
  }

  return record;
};

const unknownTypeException = (type: string) => {
  throw new Error(`Unknown value ${type}`);
};

const getType = (type: unknown): NamedNode => {
  if (typeof type !== 'string' || !(type in elementsInverseMap)) throw new Error(`Invalid value ${type}`);

  return elementsInverseMap[type as keyof typeof elementsInverseMap] ?? unknownTypeException(type);
};

const descendantToDeepRecord = (desc: TDescendant): DeepRecord => {
  if (typeof desc.text === 'string') {
    return appendMarks(desc, {
      _id: rdf.blankNode(),
      [rdfx.type.value]: elements.InnerText,
      [schema.text.value]: rdf.literal(desc.text),
    });
  } else if (desc.type === ELEMENT_IMAGE) {
    return appendOptionalImgFields(desc, {
      _id: rdf.blankNode(),
      [rdfx.type.value]: ontola.PictureSet,
      [ontola.imgUrl568x400.value]: rdf.namedNode(desc.url),
    });
  }

  const children = (desc.children as TDescendant[]).reduce((acc, child, i) => ({
    ...acc,
    [rdfx.ns(`_${i}`).value]: descendantToDeepRecord(child),
  }), {});

  return appendOptionalNodeFields(desc, {
    _id: rdf.blankNode(),
    [rdfx.type.value]: getType(desc.type),
    [elements.children.value]: {
      _id: rdf.blankNode(),
      [rdfx.type.value]: rdfx.Seq,
      ...children,
    },
  });
};

export const elementsValueToDeepRecord = (id: SomeNode | undefined, value: PlateStoreState['value']): DeepRecord => {
  const record = {
    _id: id ?? rdf.blankNode(),
    [rdfx.type.value]: elements.Document,
    [elements.children.value]: {
      _id: rdf.blankNode(),
      [rdfx.type.value]: rdfx.Seq,
    },
  };

  value!.forEach((v, i) => {
    record[elements.children.value][rdfx.ns(`_${i}`).value] = descendantToDeepRecord(v);
  });

  return record;
};
