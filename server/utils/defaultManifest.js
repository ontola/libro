import argu from '../../app/ontology/argu';

export default (origin, websocket = true) => {
  const t = new URL(origin);
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
        argu.ns('').value.slice(0, -1),
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
      website_iri: origin,
      websocket,
    },
    rdf_type: argu.Manifest.value,
    scope: origin,
    serviceworker: {
      scope: origin,
      src: `${origin}/sw.js?manifestLocation=https%3A%2F%${encodeURIComponent(origin)}%2Fargu%2Fmanifest.json`,
    },
    short_name: 'Libro',
    start_url: `${origin}/`,
    theme_color: '#475668',
  })
}
