/* eslint-disable no-unused-vars */

/**
 * These are injected through webpack.
 */
declare const __CLIENT__: boolean;
declare const __DEVELOPMENT__: boolean;
declare const __PRODUCTION__: boolean;
declare const __TEST__: boolean;
declare const __VERSION__: string;

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
interface Window {
  __REDUX_DEVTOOLS_EXTENSION__?: any;
}
