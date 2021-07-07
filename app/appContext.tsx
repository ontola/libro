import { LinkReduxLRSType } from 'link-redux';
import React, { SetStateAction } from 'react';

import { getMetaContent } from './helpers/arguHelpers';

export interface AppContext {
  lrs: LinkReduxLRSType;
  resource: string | undefined;
  theme: string;
  themeOpts: string;
  title: string;
  website: string;
}

export interface AppContextProviderProps {
  lrs: LinkReduxLRSType;
  children: React.ReactNode;
}

export interface Tracking {
  google_analytics_ua_code?: string;
  matomo_hostname?: string;
  matomo_port?: number;
  matomo_site_id?: number;
  tag_manager?: string;
}

export interface OntolaManifest {
  allowed_external_sources: string[],
  css_class: string,
  header_background: string,
  header_text: string,
  matomo_hostname: string,
  matomo_site_id: string,
  preconnect: string[],
  preload: string[],
  primary_color: string,
  secondary_color: string,
  styled_headers: boolean | null,
  theme: string,
  theme_options: string,
  tracking: Tracking,
  website_iri: string,
  websocket: string,
}

export interface WebManifest {
  ontola: Partial<OntolaManifest>;
}

export const appContext = React.createContext<AppContext>(undefined as any);
export const appContextEditor = React.createContext<React.Dispatch<SetStateAction<AppContext>>>(undefined as any);

const getWebsiteMeta = (): Partial<OntolaManifest> => {
  if (!__CLIENT__ || typeof window.WEBSITE_META === 'undefined' || Object.keys(window.WEBSITE_META).length === 0) {
    return {};
  }

  return window.WEBSITE_META;
};

export const AppContextProvider = ({
  children,
  lrs,
}: AppContextProviderProps): JSX.Element => {
  const [ctx, setCtx] = React.useState<AppContext>(() => ({
    lrs,
    resource: undefined,
    theme: getMetaContent('theme') ?? 'common',
    themeOpts: getMetaContent('themeOpts') ?? '',
    title: getMetaContent('application-name') ?? 'Libro',
    website: getMetaContent('website-iri')!,
    websiteMeta: getWebsiteMeta(),
  }));

  return (
    <React.Fragment>
      <appContextEditor.Provider value={setCtx}>
        <appContext.Provider value={ctx}>
          {children}
        </appContext.Provider>
      </appContextEditor.Provider>
    </React.Fragment>
  );
};
