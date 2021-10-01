const matomoFileNames = {
  Matomo: 'matomo',
  PiwikPro: 'ppms',
}

const matomoScript = (
  configuration,
  isUser,
  nonceStr,
) => {
  const {
    host,
    container_id,
    type,
  } = configuration;

  const trackerName = matomoFileNames[type];

  if (!host || !trackerName) {
    return '';
  }

  return (
    `<script async nonce="${nonceStr}" type="application/javascript">
        var _paq = window._paq || [];
        ${isUser ? '' : "_paq.push(['disableCookies']);"}
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u="https://${host}/";
          _paq.push(['setTrackerUrl', u+'${trackerName}.php']);
          _paq.push(['setSiteId', ${container_id}]);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'${trackerName}.js'; s.parentNode.insertBefore(g,s);
        })();
      </script>`
  );
};

const googleAnalyticsScript = (
  { container_id },
  nonceStr
) => (
  `<script async src="https://www.googletagmanager.com/gtag/js?id=${container_id}"></script>
   <script async nonce="${nonceStr}">
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', ${JSON.stringify(container_id)});
   </script>`
);

const tagManager = ({ container_id }, nonceStr) => (
  `<script nonce="${nonceStr}">(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${container_id}');</script>`
);

const tagManagerBody = ({ container_id }) => `
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${container_id}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`;

export const trackingCodes = (configurations, isUser, nonceStr) => {
  if (!configurations) {
    return ['', ''];
  }

  let head = '';
  let body = '';

  for (const configuration of configurations) {
    switch (configuration.type) {
    case 'GUA':
      body += googleAnalyticsScript(configuration, nonceStr);
      break;
    case 'GTM':
      head += tagManager(configuration, nonceStr);
      head += '\n';
      body += tagManagerBody(nonceStr);
      break;
    case 'PiwikPro':
    case 'Matomo':
      body += matomoScript(configuration, isUser, nonceStr);
      break;
    }

    body += '\n';
  }

  return [head, body];
}
