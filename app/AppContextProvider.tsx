import React from 'react';

import {
  AppContext,
  AppContextProviderProps,
  appContext,
  appContextEditor,
} from './appContext';
import { getMetaContent } from './helpers/dom';
import Communicator from './modules/Studio/components/Communicator';

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
        {__DEVELOPMENT__ && <Communicator />}
        <appContext.Provider value={ctx}>
          {children}
        </appContext.Provider>
      </appContextEditor.Provider>
    </React.Fragment>
  );
};
