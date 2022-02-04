import { Quad } from '@ontologies/core';
import { RenderHookOptions, renderHook } from '@testing-library/react-hooks';
import { DataObject } from 'link-lib';
import RDFIndex from 'link-lib/dist-types/store/RDFIndex';
import { LinkReduxLRSType, RenderStoreProvider } from 'link-redux';
import React from 'react';

import getWebsiteContextFromWebsite from './helpers/app';
import { defaultManifest } from './helpers/defaultManifest';
import generateLRS from './helpers/generateLRS';
import { resourcesToGraph } from './test-utils';

export interface HookTestBundle<TProps> {
  lrs: LinkReduxLRSType;
  wrapper: React.ComponentType<React.PropsWithChildren<TProps>>;
}

export async function createHookWrapper<TProps>(data: DataObject | DataObject[]): Promise<HookTestBundle<TProps>> {
  const websiteContext = getWebsiteContextFromWebsite('https://example.com/');
  const manifest = defaultManifest(websiteContext.websiteIRIStr);
  const [_, graph] = resourcesToGraph(data);
  const { lrs } = await generateLRS(manifest, (graph as RDFIndex).quads as Quad[]);
  const wrapper: React.ComponentType<React.PropsWithChildren<TProps>> = ({ children }) => (
    <RenderStoreProvider value={lrs}>
      {children}
    </RenderStoreProvider>
  );

  return {
    lrs,
    wrapper,
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const renderLinkedHook = async <TProps, TResult>(
  callback: (props: TProps) => TResult,
  resources: DataObject | DataObject[],
  options: RenderHookOptions<React.PropsWithChildren<TProps>> = {},
) => {
  const { wrapper } = await createHookWrapper<TProps>(resources);

  return renderHook(callback, {
    ...options,
    wrapper,
  });
};
