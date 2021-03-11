import { Theme } from '@material-ui/core';
import fa from 'fontawesome';
import { Feature } from 'ol';
import Circle from 'ol/geom/Circle';
import { toContext } from 'ol/render';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';

import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../helpers/iris';

const ANCHOR_Y_BOTTOM = 1;
const ANCHOR_X_CENTER = 0.5;
const CIRCLE_RADIUS = 12;
const CIRCLE_SIZE = 13;
const ICON_X = CIRCLE_SIZE;
const ICON_Y = CIRCLE_SIZE;
const IMG_SIZE = 26;

const iconCache: { [k: string]: Style } = {};

const drawFontAwesomeIcon = (
  canvasCtx: CanvasRenderingContext2D,
  text: string,
  highlight: boolean,
  count: number,
  theme: any,
) => {
  const circleBackground = new Fill({ color: highlight ? '#92a1b5' : '#475668' });
  const circleStroke = new Stroke({
    color: 'white',
    width: 2,
  });
  const circleStyle = new Style({
    fill: circleBackground,
    image: new CircleStyle({
      fill: circleBackground,
      radius: 10,
      stroke: circleStroke,
    }),
    stroke: circleStroke,
  });

  const circle = new Circle([CIRCLE_SIZE, CIRCLE_SIZE], CIRCLE_RADIUS);

  const vectorContext = toContext(canvasCtx, {
    pixelRatio: 1,
    size: [100, 100],
  });
  vectorContext.setStyle(circleStyle);
  vectorContext.drawGeometry(circle);

  let renderText;
  let renderFont;
  if (count > 1) {
    renderText = count.toString();
    renderFont = `bold 16px ${theme.typography.h1.fontFamily}`;
  } else {
    renderText = text;
    renderFont = 'normal 18px FontAwesome';
  }
  /* eslint-disable no-param-reassign */
  canvasCtx.fillStyle = 'white';
  canvasCtx.font = renderFont;
  canvasCtx.textAlign = 'center';
  canvasCtx.textBaseline = 'middle';
  /* eslint-enable no-param-reassign */
  canvasCtx.fillText(renderText, ICON_X, ICON_Y);
};

const generateIconStyle = (image: string, highlight = false, count: number, theme: any) => {
  const canvas = document.createElement('canvas');
  const canvasCtx = canvas.getContext('2d');

  if (canvasCtx && isFontAwesomeIRI(image)) {
    drawFontAwesomeIcon(canvasCtx, fa(normalizeFontAwesomeIRI(image)), highlight, count, theme);
  }

  return new Style({
    image: new Icon({
      anchor: [ANCHOR_X_CENTER, ANCHOR_Y_BOTTOM],
      img: canvas,
      imgSize: [IMG_SIZE, IMG_SIZE],
    }),
  });
};

const featureCount = (feature: Feature) => (
  feature?.get('features')?.length || 0
);

const getStyle = (image: string, highlight: boolean, theme: any) => (feature: Feature) => {
  const count = featureCount(feature);
  const cacheKey = [image, highlight, count].filter(Boolean).join('-');

  if (!iconCache[cacheKey]) {
    const icon = generateIconStyle(image, highlight, count, theme);

    iconCache[cacheKey] = icon;
  }

  return iconCache[cacheKey];
};

export const getStyles = (image: string, theme: Theme): {
  hoverStyle: (feature: Feature) => Style,
  style: (feature: Feature) => Style,
} => {
  const style = getStyle(image, false, theme);
  const hoverStyle = getStyle(image, true, theme);

  return {
    hoverStyle,
    style,
  };
};
