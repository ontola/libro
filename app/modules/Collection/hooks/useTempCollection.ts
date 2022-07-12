import * as as from '@ontologies/as';
import rdf, { NamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {  } from '@rdfdev/iri';
import { SomeNode } from 'link-lib';
import { useTempRecord } from 'link-redux';
import React from 'react';

import app, { trailing } from '../../Common/ontology/app';
import ontola from '../../Kernel/ontology/ontola';

/**
 * Create a temporary collection with all {items} in a single page.
 */
export const useTempCollection = (
  baseId: NamedNode,
  items: SomeNode[],
  columns: NamedNode[],
  collectionDisplay: NamedNode = ontola['collectionDisplay/table'],
  defaultType: NamedNode = ontola['collectionType/paginated'],
): SomeNode => {
  const [collection] = React.useState(rdf.namedNode(trailing(baseId.value)));
  const [view] = React.useState(app.ns(`${collection}?page=1`));

  const itemsSeq = useTempRecord(rdfx.Seq, (set) => {
    items.forEach((it, i) => {
      set(rdfx.ns(`_${i}`), it);
    });
  }, [items]);

  const columnsList = useTempRecord(rdfx.Seq, (set) => {
    columns.forEach((column, i) => {
      set(rdfx.ns(`_${i}`), column);
    });
  }, []);

  useTempRecord(ontola.PaginatedView, (set) => {
    set(schema.isPartOf, collection);
    set(as.partOf, collection);
    set(ontola.baseCollection, collection);
    set(ontola.collectionDisplay, collectionDisplay);
    set(as.items, itemsSeq);
    set(as.totalItems, items.length.toString());
  }, [collection, itemsSeq], view);

  return useTempRecord(ontola.Collection, (set) => {
    set(as.name, `Topologies (${items.length})`);
    set(ontola.columns, columnsList);
    set(ontola.collectionDisplay, collectionDisplay);
    set(ontola.defaultType, defaultType);
    set(ontola.iriTemplate, collection);
    set(ontola.pages, view);
    set(as.first, view);
    set(as.last, view);
    set(as.totalItems, items.length.toString());
  }, [view, columns], collection);
};
