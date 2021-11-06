export const manifestSchemas = [
  {
    fileMatch: [
      'manifest',
      'manifest.json',
      '/manifest.json',
    ],
    schema: {
      properties: {
        background_color: {
          format: 'color-hex',
          type: 'string',
        },
        display: {
          enum: ['standalone', 'fullscreen', 'minimal-ui', 'browser'],
        },
        icons: {
          items: {
            $ref: 'https://schema.ontola.io/manifest/icon.json',
          },
          type: 'array',
        },
        lang: { type: 'string' },
        name: { type: 'string' },
        ontola: {
          $ref: 'https://schema.ontola.io/manifest/ontola.json',
        },
        short_name: {
          type: 'string',
        },
        theme_color: {
          format: 'color-hex',
          type: 'string',
        },
      },
      required: ['ontola'],
      type: 'object',
    },
    uri: 'https://schema.ontola.io/manifest.json',
  },
  {
    schema: {
      properties: {
        sizes: {
          type: 'string',
        },
        src: {
          format: 'uri',
          type: 'string',
        },
        type: {
          type: 'string',
        },
      },
      required: ['src', 'type'],
      type: 'object',
    },
    uri: 'https://schema.ontola.io/manifest/icon.json',
  },
  {
    schema: {
      properties: {
        css_class: { type: 'string' },
        header_background: { type: 'string' },
        header_text: { type: 'string' },
        preconnect: {
          item: {
            format: 'uri',
            type: 'string',
          },
          type: 'array',
        },
        preload: {
          item: {
            format: 'uri',
            type: 'string',
          },
          type: 'array',
        },
        primary_color: {
          format: 'color-hex',
          type: 'string',
        },
        secondary_color: {
          format: 'color-hex',
          type: 'string',
        },
        theme: {
          enum: [
            'common',
            'academy',
            'dexTransfer',
            'dutchGovernment',
            'groenLinks',
            'salesWebsite',
          ],
        },
        theme_options: { type: 'string' },
        website_iri: {
          format: 'uri',
          type: 'string',
        },
        websocket_path: {
          format: 'uri',
          type: 'string',
        },
      },
      required: [
        'primary_color',
        'secondary_color',
        'theme',
        'website_iri',
      ],
      type: 'object',
    },
    uri: 'https://schema.ontola.io/manifest/ontola.json',
  },
];
