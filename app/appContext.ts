import { LinkReduxLRSType } from 'link-redux';
import React, { SetStateAction } from 'react';

export interface AppContext {
  lrs: LinkReduxLRSType;
  manifest: WebManifest;
  resource: string | undefined;
  theme: string;
  themeOpts: string;
  title: string;
  website: string;
}

export interface AppContextProviderProps {
  lrs: LinkReduxLRSType;
  children: React.ReactNode;
  appCtxOverrides?: Partial<AppContext>;
  manifest: WebManifest;
}

export interface Tracking {
  type: string;
  containerId: string;
}

export interface GUATracker extends Tracking {
  type: 'GUA';
}

export interface GTMTracker extends Tracking {
  type: 'GTM';
}

export interface PiwikProTracker extends Tracking {
  type: 'PiwikPro';
  host: string | undefined;
}

export interface MatomoTracker extends Tracking {
  type: 'Matomo';
  host: string | undefined;
}

export type Tracker =
  GUATracker |
  GTMTracker |
  PiwikProTracker |
  MatomoTracker;

export interface OntolaManifest {
  allowed_external_sources: string[],
  css_class: string,
  header_background: string,
  header_text: string,
  preconnect: string[],
  preload: string[],
  primary_color: string,
  secondary_color: string,
  styled_headers: boolean | null,
  theme: string,
  theme_options: string,
  tracking: Tracker[],
  website_iri: string,
  websocket_path?: string | null,
}

export interface Icon {
  src: string;
  sizes: string;
  type: string;
}

export interface WebManifest {
  background_color?: string;
  canonical_iri?: string | null;
  dir?: string;
  display?: string;
  icons: Icon[];
  lang?: string;
  name?: string;
  ontola: OntolaManifest;
  rdf_type?: string;
  serviceworker?: {
    scope: string;
    src: string;
  };
  scope: string;
  short_name: string;
  start_url?: string;
  theme_color?: string
}

export const appContext = React.createContext<AppContext>(undefined as any);
export const appContextEditor = React.createContext<React.Dispatch<SetStateAction<AppContext>>>(undefined as any);
