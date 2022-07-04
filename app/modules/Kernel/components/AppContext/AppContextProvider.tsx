import { LinkReduxLRSType } from 'link-redux';
import React from 'react';

import { getMetaContent } from '../../lib/dom';

import {
  AppContext,
  AppContextProviderProps,
  appContext,
} from './appContext';
import { WebManifest } from './WebManifest';

const defaultCtxValue = <T extends AppContext, K extends string & keyof T>(
  appCtxOverrides: Partial<T> | undefined,
  key: K,
  fallback: T[K],
): T[K] => appCtxOverrides?.[key] ?? (getMetaContent(key) as unknown as T[K]) ?? fallback;

const appContextFactory = (lrs: LinkReduxLRSType, manifest: WebManifest, appCtxOverrides?: Partial<AppContext>) => () => ({
  lrs,
  manifest,
  resource: undefined,
  theme: defaultCtxValue(appCtxOverrides, 'theme', 'common'),
  themeOpts: defaultCtxValue(appCtxOverrides, 'themeOpts', ''),
  title: defaultCtxValue(appCtxOverrides, 'title', manifest.name ?? 'Libro') as string,
  website: defaultCtxValue(appCtxOverrides, 'website', manifest.ontola.website_iri),
});

export const AppContextProvider = ({
  children,
  lrs,
  appCtxOverrides,
  manifest,
}: AppContextProviderProps): JSX.Element => {
  const ctx = React.useMemo<AppContext>(appContextFactory(lrs, manifest, appCtxOverrides), []);

  return (
    <appContext.Provider value={ctx}>
      {children}
    </appContext.Provider>
  );
};
