/* eslint-disable no-unused-vars */

/**
 * These are injected through webpack.
 */
declare const __CLIENT__: boolean;
declare const __DEVELOPMENT__: boolean;
declare const __PRODUCTION__: boolean;
declare const __TEST__: boolean;
declare const __VERSION__: string;

interface WebsiteMeta {
  allowed_external_sources?: string[];
  css_class?: string;
  header_background?: string;
  header_text?: string;
  matomo_hostname?: string;
  matomo_site_id?: number;
  preconnect?: string[];
  preload?: string[]
  primary_color?: string;
  secondary_color?: string;
  styled_headers?: boolean;
  theme?: string;
  theme_options?: string;
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
interface Window {
  __REDUX_DEVTOOLS_EXTENSION__?: any;
  INITIAL__DATA?: string;
  WEBSITE_META?: WebsiteMeta;
}
