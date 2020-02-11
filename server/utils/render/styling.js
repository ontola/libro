import * as constants from '../../config';
import manifests from '../manifest';

export const deferredBodyStyles = (nonceStr) => `
    <script async nonce="${nonceStr}">
      var loadDeferredStyles = function() {
          var addStylesNode = document.getElementById("deferred-styles");
          var replacement = document.createElement("div");
          replacement.innerHTML = addStylesNode.textContent;
          document.body.appendChild(replacement);
          addStylesNode.parentElement.removeChild(addStylesNode);
      };
      var raf = requestAnimationFrame || mozRequestAnimationFrame ||
        webkitRequestAnimationFrame || msRequestAnimationFrame;
      if (raf) raf(function() {window.setTimeout(loadDeferredStyles, 0);});
      else window.addEventListener('load', loadDeferredStyles);
    </script>
`;

export const deferredHeadStyles = (bundleVersion) => {
  const bundleManifest = manifests[bundleVersion];
  const bundleCSS = __DEVELOPMENT__
    ? ''
    : `<link crossorigin="anonymous" rel="stylesheet" type="text/css" href="${constants.ASSETS_HOST}${bundleManifest['main.css']}" />`;


  return `
    <noscript id="deferred-styles">
        ${bundleCSS}
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet">
        <link crossorigin="anonymous" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    </noscript>
  `;
};

export const icons = (ctx) => ctx
  .manifest
  .icons
  ?.map((icon) => {
    if (icon.src.includes('favicon')) {
      return `<link rel="icon" type="${icon.type}" sizes="${icon.sizes}" href="${icon.src}">`;
    } else if (icon.src.includes('apple-touch-icon')) {
      return `<link rel="apple-touch-icon" type="${icon.type}" sizes="${icon.sizes}" href="${icon.src}">`;
    } else if (icon.src.includes('mstile-310x310.png')) {
      return `<meta name="msapplication-TileImage" content="${icon.src}">`;
    }

    return null;
  })
  ?.filter(Boolean)
  ?.join('\n');

export const themeBlock = ({ manifest: { ontola } }) => `
    <style id="theme-config">
        :root {
          --accent-background-color:${ontola.secondary_main};
          --accent-color:${ontola.secondary_text};
          --navbar-background:${ontola.primary_main};
          --navbar-color:${ontola.primary_text};
          --navbar-color-hover:${ontola.primary_text}12;
        }
        .accent-background-color {
          background-color: ${ontola.secondary_main};
        }
        .accent-color {
          color: ${ontola.secondary_text};
        }
        .navbar-background {
          background: ${ontola.primary_main};
        }
        .navbar-color {
          color: ${ontola.primary_text};
        }
    </style>
`;
