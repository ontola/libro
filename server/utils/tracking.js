const matomoScript = (
  matomoHostname,
  matomoPort,
  matomoSiteId,
  isUser,
  nonceStr
) => {
  if (matomoHostname && matomoSiteId) {
    let matomoHost = matomoHostname;

    if (matomoPort) {
      matomoHost = `${matomoHostname}:${matomoPort}`;
    }

    return (
      `<script async nonce="${nonceStr}" type="application/javascript">
          var _paq = window._paq || [];
          ${isUser ? '' : "_paq.push(['disableCookies']);"}
          /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="https://${matomoHost}/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', ${matomoSiteId}]);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
          })();
        </script>`
    );
  }

  return '';
};

const googleAnalyticsScript = (
  googleAnalyticsUACode,
  nonceStr
) => {
  if (googleAnalyticsUACode) {
    return (
      `<script async src="https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsUACode}"></script>
       <script async nonce="${nonceStr}">
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', ${JSON.stringify(googleAnalyticsUACode)});
       </script>`
    );
  }

  return '';
};

const tagManager = (id) => `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');</script>`;

const tagManagerBody = (id) => `
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${id}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`;

export {
  googleAnalyticsScript,
  matomoScript,
  tagManager,
  tagManagerBody 
};
