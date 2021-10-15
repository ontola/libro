import React from 'react';

import {
  AppContext,
  AppContextProviderProps,
  OntolaManifest,
  appContext,
  appContextEditor,
} from './appContext';
import { getMetaContent } from './helpers/dom';
import Communicator from './modules/Studio/components/Communicator';

const getWebsiteMeta = (): Partial<OntolaManifest> => {
  if (!__CLIENT__
    || typeof window.WEBSITE_META === 'undefined'
    || Object.keys(window.WEBSITE_META).length === 0) {
    return {};
  }

  return window.WEBSITE_META;
};

export const AppContextProvider = ({
  children,
  lrs,
}: AppContextProviderProps): JSX.Element => {
  const [ctx, setCtx] = React.useState<AppContext>(() => (
    {
      lrs,
      resource: undefined,
      theme: getMetaContent('theme') ?? 'common',
      themeOpts: getMetaContent('themeOpts') ?? '',
      title: getMetaContent('application-name') ?? 'Libro',
      website: getMetaContent('website-iri')!,
      websiteMeta: getWebsiteMeta(),
    }
  ));

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
