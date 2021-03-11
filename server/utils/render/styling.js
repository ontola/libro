import { checkLuminance } from '../../../app/helpers/color';
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
    : `<link crossorigin="anonymous" rel="stylesheet" type="text/css" href="${constants.assetsHost}${bundleManifest['main.css']}" />`;


  return `
    <noscript id="deferred-styles">
        ${bundleCSS}
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet">
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

export const navbarBackground = ({ manifest: { ontola } }) => {
  switch (ontola.header_background) {
  case 'white':
    return '#FFFFFF';
  case 'secondary':
    return ontola.secondary_color;
  case 'primary':
    return ontola.primary_color;
  default:
    return ontola.header_background;
  }
};

export const navbarColor = ({ manifest: { ontola } }) => {
  switch (ontola.header_text) {
  case 'auto':
    return '#222222';
  case 'secondary':
    return ontola.secondary_color;
  case 'primary':
    return ontola.primary_color;
  default:
    return ontola.header_text;
  }
};

export const themeBlock = (ctx) => `
    <style id="theme-config">
        :root {
          --accent-background-color:${ctx.manifest.ontola.primary_color};
          --accent-color:${checkLuminance(ctx.manifest.ontola.primary_color) ? '#222222' : '#FFFFFF'};
          --navbar-background:${navbarBackground(ctx)};
        }
    </style>
`;
