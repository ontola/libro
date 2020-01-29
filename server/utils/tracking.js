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

export {
  googleAnalyticsScript,
  matomoScript,
};
