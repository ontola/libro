import {
  RenderHookOptions,
  RenderHookResult,
  act,
  renderHook,
} from '@testing-library/react-hooks';
import { DataObject } from 'link-lib';
import { DataProcessorOpts } from 'link-lib/dist-types/types';
import { LinkReduxLRSType, RenderStoreProvider } from 'link-redux';
import React from 'react';

import { defaultManifest } from '../app/helpers/defaultManifest';
import generateLRS from '../app/helpers/generateLRS';
import { handle } from '../app/helpers/logging';
import { quadruplesToDataSlice } from '../app/modules/Kernel/lib/quadruplesToDataSlice';
import { getWebsiteContextFromWebsite } from '../app/modules/Kernel/components/WebsiteContext/WebsiteContextProvider';

import { TestRenderOpts, resourcesToGraph } from './test-utils';

import SpyInstance = jest.SpyInstance;
import ArgsType = jest.ArgsType;
import Mock = jest.Mock;

type QueueEntityType = LinkReduxLRSType['queueEntity'];

export interface HookTestBundle<TProps> {
  lrs: LinkReduxLRSType;
  wrapper: React.ComponentType<React.PropsWithChildren<TProps>>;
}

type Fetch = Exclude<DataProcessorOpts['fetch'], undefined>;

export interface LRSSpies {
  fetch: Mock<ReturnType<Fetch>, ArgsType<Fetch>>;
  queueEntitySpy?: SpyInstance<ReturnType<QueueEntityType>, ArgsType<QueueEntityType>>;
}

export async function createHookWrapper<TProps>(data: DataObject | DataObject[], opts: TestRenderOpts): Promise<HookTestBundle<TProps> & LRSSpies> {
  const websiteContext = getWebsiteContextFromWebsite('https://example.com/');
  const manifest = defaultManifest(websiteContext.websiteIRIStr);
  const [_, graph] = resourcesToGraph(data);
  const slice = quadruplesToDataSlice(graph.quads);
  const spies: LRSSpies = {
    fetch: jest.fn().mockImplementation((a) => Promise.reject({ error: `No fetching during test (${a})` })),
  };
  // eslint-disable-next-line no-inline-comments
  const modules = opts.modules ?? [];
  const { lrs } = await generateLRS(manifest, modules, slice, {}, {
    apiOpts: {
      fetch: spies.fetch,
    },
    report: (e) => (e && typeof e === 'object' && 'error' in e) ? void (0) : handle(e),
  });

  spies.queueEntitySpy = jest.spyOn(lrs, 'queueEntity');

  const wrapper: React.ComponentType<React.PropsWithChildren<TProps>> = ({ children }) => (
    <RenderStoreProvider value={lrs}>
      {children}
    </RenderStoreProvider>
  );

  return {
    ...spies,
    lrs,
    wrapper,
  };
}

export const renderLinkedHook = async <TProps, TResult>(
  callback: (props: TProps) => TResult,
  resources: DataObject | DataObject[],
  options: TestRenderOpts & RenderHookOptions<React.PropsWithChildren<TProps>> = {},
): Promise<RenderHookResult<TProps, TResult> & LRSSpies> => {
  const { fetch, wrapper, queueEntitySpy } = await createHookWrapper<TProps>(resources, options);
  let result: RenderHookResult<TProps, TResult>;

  await act(() => new Promise<void>((resolve) => {
    result = renderHook(callback, {
      ...options,
      wrapper,
    });

    resolve();
  }));

  return {
    ...result!,
    fetch,
    queueEntitySpy,
  };
};
