export const renderFullPage = (html, devPort, domain, initialState = {}, head) => {
  const bundleCSS = process.env.NODE_ENV === 'production'
    ? '<link rel="stylesheet" type="text/css" href="/dist/bundle.css" />'
    : '';

  return `<!doctype html>
    <meta charset="utf-8">
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta property="og:type" content="website" />
        ${head ? head.title.toString() : ''}
        ${head ? head.meta.toString() : ''}
        ${bundleCSS}
      </head>
      <body>
        <div id="root">${html}</div>

        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState || {})};
        </script>

        <script src="/dist/bundle.js"></script>
      </body>
    </html>`;
};
