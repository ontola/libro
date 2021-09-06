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
    containerId,
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
          _paq.push(['setSiteId', ${containerId}]);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'${trackerName}.js'; s.parentNode.insertBefore(g,s);
        })();
      </script>`
  );
};

const googleAnalyticsScript = (
  { containerId },
  nonceStr
) => (
  `<script async src="https://www.googletagmanager.com/gtag/js?id=${containerId}"></script>
   <script async nonce="${nonceStr}">
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', ${JSON.stringify(containerId)});
   </script>`
);

const tagManager = ({ id: containerId }, nonceStr) => (
  `<script nonce="${nonceStr}">(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');</script>`
);

const tagManagerBody = ({ containerId }) => `
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}"
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
