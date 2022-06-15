import React from 'react';

import { getMetaContent } from '../../../Common/lib/dom';
import CommunicatorLoader from '../../../Studio/components/CommunicatorLoader';

import {
  AppContext,
  AppContextProviderProps,
  appContext,
  appContextEditor,
} from './appContext';

const defaultCtxValue = <T extends AppContext, K extends string & keyof T>(
  appCtxOverrides: Partial<T> | undefined,
  key: K,
  fallback: T[K],
): T[K] => appCtxOverrides?.[key] ?? (getMetaContent(key) as unknown as T[K]) ?? fallback;

export const AppContextProvider = ({
  children,
  lrs,
  appCtxOverrides,
  manifest,
}: AppContextProviderProps): JSX.Element => {
  const [ctx, setCtx] = React.useState<AppContext>(() => ({
    lrs,
    manifest,
    resource: undefined,
    theme: defaultCtxValue(appCtxOverrides, 'theme', 'common'),
    themeOpts: defaultCtxValue(appCtxOverrides, 'themeOpts', ''),
    title: defaultCtxValue(appCtxOverrides, 'title', 'Libro') as string,
    website: defaultCtxValue(appCtxOverrides, 'website', manifest.ontola.website_iri),
  }));

  return (
    <React.Fragment>
      <appContextEditor.Provider value={setCtx}>
        <CommunicatorLoader websiteIRI={manifest.ontola.website_iri} />
        <appContext.Provider value={ctx}>
          {children}
        </appContext.Provider>
      </appContextEditor.Provider>
    </React.Fragment>
  );
};
