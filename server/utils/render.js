export const renderFullPage = (html, devPort, domain, initialState = {}, head) => {

  const bundleCSS = initialState !== null || process.env.NODE_ENV === 'production'
    ? `<link rel="stylesheet" type="text/css" href="http://${domain}:${devPort}/dist/bundle.css"></style>`
    : '';

  return `
    <!doctype html>
    <meta charset="utf-8">
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta property="og:type" content="website" />
        ${head ? head.title.toString() : ''}
        ${head ? head.meta.toString() : ''}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" />
        ${bundleCSS}
      </head>
      <body>
        <div id="root">${html ? html : ''}</div>

        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState || {})};
        </script>

        <script src="http://${domain}:${devPort}/dist/bundle.js"></script>
      </body>
    </html>
    `;
};
