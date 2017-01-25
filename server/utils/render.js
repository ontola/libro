export const renderFullPage = (html, devPort, domain, csrfToken, initialState = {}, head) => {
  const bundleCSS = process.env.NODE_ENV === 'production'
    ? '<link rel="stylesheet" type="text/css" href="/dist/bundle.css" />'
    : '';

  return `<!doctype html>
    <meta charset="utf-8">
    <html>
      <head>
        <meta charset="utf-8" />
        <meta property="og:type" content="website" />
        <link rel="manifest" href="/static/manifest.json">

        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="application-name" content="AOD">
        <meta name="apple-mobile-web-app-title" content="AOD">
        <meta name="theme-color" content="#60707F">
        <meta name="msapplication-navbutton-color" content="#60707F">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="msapplication-starturl" content="/">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        <meta name="csrf-param" content="authenticity_token">
        <meta name="csrf-token" content="${csrfToken}">

        <link rel="icon" type="image/png" sizes="192x192" href="/static/icon-large.png">
        <link rel="apple-touch-icon" type="image/png" sizes="192x192" href="/static/icon-large.png">
        <link rel="icon" type="image/png" sizes="128x128" href="/static/icon-medium.png">
        <link rel="apple-touch-icon" type="image/png" sizes="128x128" href="/static/icon-medium.png">
        <link rel="icon" type="image/png" sizes="72x72" href="/static/icon-small.png">
        <link rel="apple-touch-icon" type="image/png" sizes="72x72" href="/static/icon-small.png">
        ${head ? head.title.toString() : ''}
        ${head ? head.meta.toString() : ''}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" />
        ${bundleCSS}
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>`;
};
