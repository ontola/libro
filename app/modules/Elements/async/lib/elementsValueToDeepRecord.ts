import rdf, { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import * as rdfx from '@ontologies/rdf';
import { TDescendant } from '@udecode/plate';
import { PlateStoreState } from '@udecode/plate-core/dist/types/PlateStore';
import { SomeNode } from 'link-lib';
import { DeepRecord } from 'link-lib/dist-types/store/StructuredStore';

import elements from '../../../../ontology/elements';

import { elementsInverseMap } from './mapping';

const unknownTypeException = (type: string) => {
  throw new Error(`Unknown value ${type}`);
};

const getType = (type: unknown): NamedNode => {
  if (typeof type !== 'string' || !(type in elementsInverseMap)) throw new Error(`Invalid value ${type}`);

  return elementsInverseMap[type as keyof typeof elementsInverseMap] ?? unknownTypeException(type);
};

const descendantToDeepRecord = (desc: TDescendant): DeepRecord => {
  if (typeof desc.text === 'string') {
    return {
      _id: rdf.blankNode(),
      [rdfx.type.value]: elements.InnerText,
      [schema.text.value]: rdf.literal(desc.text),
    };
  }

  const children = (desc.children as TDescendant[]).reduce((acc, child, i) => ({
    ...acc,
    [rdfx.ns(`_${i}`).value]: descendantToDeepRecord(child),
  }), {});

  return {
    _id: rdf.blankNode(),
    [rdfx.type.value]: getType(desc.type),
    [elements.children.value]: {
      _id: rdf.blankNode(),
      [rdfx.type.value]: rdfx.Seq,
      ...children,
    },
  };
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
