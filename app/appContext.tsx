import { LinkReduxLRSType } from 'link-redux';
import React, { SetStateAction } from 'react';

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
  tracking: Tracking[],
  website_iri: string,
  websocket: string,
  websocket_path?: string,
}

export interface WebManifest {
  ontola: Partial<OntolaManifest>;
}

export const appContext = React.createContext<AppContext>(undefined as any);
export const appContextEditor = React.createContext<React.Dispatch<SetStateAction<AppContext>>>(undefined as any);
