import { RenderHookOptions, renderHook } from '@testing-library/react-hooks';
import { DataObject } from 'link-lib';
import { LinkReduxLRSType, RenderStoreProvider } from 'link-redux';
import React from 'react';

import { defaultManifest } from '../app/helpers/defaultManifest';
import generateLRS from '../app/helpers/generateLRS';
import { quadruplesToDataSlice } from '../app/modules/Common/lib/quadruplesToDataSlice';
import { getWebsiteContextFromWebsite } from '../app/modules/Core/components/WebsiteContext/WebsiteContextProvider';

import { resourcesToGraph } from './test-utils';

export interface HookTestBundle<TProps> {
  lrs: LinkReduxLRSType;
  wrapper: React.ComponentType<React.PropsWithChildren<TProps>>;
}

export async function createHookWrapper<TProps>(data: DataObject | DataObject[]): Promise<HookTestBundle<TProps>> {
  const websiteContext = getWebsiteContextFromWebsite('https://example.com/');
  const manifest = defaultManifest(websiteContext.websiteIRIStr);
  const [_, graph] = resourcesToGraph(data);
  const slice = quadruplesToDataSlice(graph.quads);
  const { lrs } = await generateLRS(manifest, slice, {});
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
