import React, { SetStateAction } from 'react';

import {
  AppContext,
  AppContextProviderProps,
  appContext,
} from '../../Kernel/components/AppContext/appContext';
import { getMetaContent } from '../../Kernel/lib/dom';
import { modulesKey } from '../../Kernel/lib/settings';
import CommunicatorLoader from '../../Studio/components/CommunicatorLoader';

export const appContextEditor = React.createContext<React.Dispatch<SetStateAction<AppContext>>>(undefined as any);

const defaultCtxValue = <T extends AppContext, K extends string & keyof T>(
  appCtxOverrides: Partial<T> | undefined,
  key: K,
  fallback: T[K],
): T[K] => appCtxOverrides?.[key] ?? (getMetaContent(key) as unknown as T[K]) ?? fallback;

export const AppContextEditor = ({
  children,
  lrs,
  appCtxOverrides,
  manifest,
  modules,
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
        <CommunicatorLoader
          modules={modules ?? lrs.settings.get(modulesKey)}
          websiteIRI={manifest.ontola.website_iri}
        />
        <appContext.Provider value={ctx}>
          {children}
        </appContext.Provider>
      </appContextEditor.Provider>
    </React.Fragment>
  );
};
