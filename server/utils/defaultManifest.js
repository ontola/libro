/**
 * Keep in sync with app/helpers/defaultManifest.ts
 */

export const defaultManifest = (websiteIRI) => {
  const t = new URL(websiteIRI);
  t.host = `analytics.${t.host}`;
  const matomoHostname = t.toString();

  return ({
    background_color: '#eef0f2',
    canonical_iri: null,
    dir: 'rtl',
    display: 'standalone',
    icons: [],
    lang: 'en-US',
    name: 'Libro',
    ontola: {
      allowed_external_sources: [],
      css_class: 'default',
      header_background: 'primary',
      header_text: 'auto',
      preconnect: [],
      preload: [
        'https://argu.co/ns/core',
      ],
      primary_color: '#475668',
      secondary_color: '#d96833',
      styled_headers: null,
      theme: 'default',
      theme_options: '',
      tracking: [
        {
          containerId: '-1',
          host: matomoHostname,
          type: 'Matomo',
        },
      ],
      website_iri: websiteIRI,
      websocket_path: null,
    },
    rdf_type: 'https://argu.co/ns/core#Manifest',
    scope: websiteIRI,
    serviceworker: {
      scope: websiteIRI,
      src: `${websiteIRI}/sw.js`,
    },
    short_name: 'Libro',
    start_url: `${websiteIRI}/`,
    theme_color: '#475668',
  });
};
