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
  blob_upload_iri?: string,
  blob_preview_iri?: string,
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
  theme_color?: string;
}
