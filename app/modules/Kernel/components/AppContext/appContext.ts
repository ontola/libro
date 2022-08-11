import { LinkReduxLRSType } from 'link-redux';
import React from 'react';

import type { Module } from '../../../../Module';

import type { WebManifest } from './WebManifest';

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
  modules?: Module[];
}

export const appContext = React.createContext<AppContext>(undefined as any);
