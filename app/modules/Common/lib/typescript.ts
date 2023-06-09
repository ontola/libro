/* eslint-disable no-unused-vars */

import { WebManifest } from '../../Kernel/components/AppContext/WebManifest';

/**
 * These are injected through webpack.
 */
declare global {
  const __CLIENT__: boolean;
  const __DEVELOPMENT__: boolean;
  const __PRODUCTION__: boolean;
  const __TEST__: boolean;
  const __VERSION__: string;

  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any;
    INITIAL__DATA?: string;
    EMP_SYMBOL_MAP: Record<string, string>;
    WEBSITE_MANIFEST?: WebManifest;
  }
}
