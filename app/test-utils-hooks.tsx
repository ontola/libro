import { Quad } from '@ontologies/core';
import {
  DataObject,
  RDFStore,
  toGraph, 
} from 'link-lib';
import RDFIndex from 'link-lib/dist-types/store/RDFIndex';
import { ParsedObject } from 'link-lib/dist-types/types';
import { LinkReduxLRSType, RenderStoreProvider } from 'link-redux';
import React from 'react';

import generateLRS from './helpers/generateLRS';

export const resourcesToGraph = (resources: DataObject): ParsedObject => {
  if (Array.isArray(resources)) {
    const graphs = resources.map((r) => toGraph(r));
    const mainIRI = graphs[0][0];
    const store = new RDFStore().getInternalStore();

    for (const g of graphs) {
      const s = g[1];
      store.addQuads((s as any).quads);
    }

    const dataObjects = graphs.reduce((acc, [, , namedBlobTuple]): any => [...acc, ...namedBlobTuple], []);

    return [mainIRI, store, dataObjects];
  }

  return toGraph(resources);
};

export interface HookTestBundle {
  lrs: LinkReduxLRSType;
  wrapper: (props: { children: JSX.Element }) => JSX.Element;
}

export const createHookWrapper = (data: DataObject): HookTestBundle => {
  const [_, graph] = resourcesToGraph(data);
  const { lrs } = generateLRS((graph as RDFIndex).quads as Quad[]);
  const wrapper = ({ children }: { children: JSX.Element }) => (
    <RenderStoreProvider value={lrs}>
      {children}
    </RenderStoreProvider>
  );

  return {
    lrs,
    wrapper,
  };
};
