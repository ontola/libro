import * as fa from 'fontawesome';
import Circle from 'ol/geom/Circle';
import ImageState from 'ol/ImageState';
import { toContext } from 'ol/render';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';
import { get as getIconImage } from 'ol/style/IconImage';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import { useLayoutEffect, useMemo } from 'react';

import {
  isFontAwesomeIRI,
  normalizeFontAwesomeIRI,
} from '../../helpers/iris';

const ANCHOR_Y_BOTTOM = 1;
const ANCHOR_X_CENTER = 0.5;
const CIRCLE_RADIUS = 12;
const CIRCLE_SIZE = 13;
const ICON_X = CIRCLE_SIZE;
const ICON_Y = CIRCLE_SIZE;
const IMG_SIZE = 26;

const iconCache = {};

const getImage = (image) => {
  const img = getIconImage(null, image, IMG_SIZE, true, ImageState.IDLE, null);
  img.load();

  return img;
};

const generateImageStyle = (image, highlight, count, theme) => {
  const canvas = document.createElement('canvas');
  const canvasCtx = canvas.getContext('2d');

  if (highlight) {
    canvasCtx.globalAlpha = 0.6;
  }
  const img = getImage(image);
  canvasCtx.drawImage(img.getImage(), 0, 0, IMG_SIZE, IMG_SIZE);
  canvasCtx.globalAlpha = 1;

  const numberText = count > 1 && (
    new Text({
      fill: new Fill({ color: 'white' }),
      font: `bold 16px ${theme.typography.h1.fontFamily}`,
      offsetX: CIRCLE_RADIUS,
      text: count.toString(),
    })
  );

  return {
    image: new Icon({
      anchor: [ANCHOR_X_CENTER, ANCHOR_Y_BOTTOM],
      img: canvas,
      imgSize: [IMG_SIZE, IMG_SIZE],
    }),
    text: numberText,
  };
};

const generateFontAwesomeStyle = (image, highlight, count, theme) => {
  const canvas = document.createElement('canvas');
  const canvasCtx = canvas.getContext('2d');

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

  let renderText, renderFont;
  if (count > 1) {
    renderText = count;
    renderFont = `bold 16px ${theme.typography.h1.fontFamily}`;
  } else {
    renderText = fa(normalizeFontAwesomeIRI(image));
    renderFont = 'normal 18px FontAwesome';
  }
  /* eslint-disable no-param-reassign */
  canvasCtx.fillStyle = 'white';
  canvasCtx.font = renderFont;
  canvasCtx.textAlign = 'center';
  canvasCtx.textBaseline = 'middle';
  /* eslint-enable no-param-reassign */
  canvasCtx.fillText(renderText, ICON_X, ICON_Y);

  return {
    image: new Icon({
      anchor: [ANCHOR_X_CENTER, ANCHOR_Y_BOTTOM],
      img: canvas,
      imgSize: [IMG_SIZE, IMG_SIZE],
    }),
  };
};

const generateIconStyle = (image, highlight = false, count, theme) => {
  let style;
  if (isFontAwesomeIRI(image)) {
    style = generateFontAwesomeStyle(image, highlight, count, theme);
  } else {
    style = generateImageStyle(image, highlight, count, theme);
  }

  return new Style(style);
};

const featureCount = (feature) => (
  feature?.get('features')?.length || 0
);

const getStyle = (image, highlight, theme) => (feature) => {
  const count = featureCount(feature);
  const cacheKey = [image, highlight, count].filter(Boolean).join('-');

  if (!iconCache[cacheKey]) {
    const icon = generateIconStyle(image, highlight, count, theme);

    iconCache[cacheKey] = icon;
  }

  return iconCache[cacheKey];
};

export const useImageStyles = (images, theme) => {
  const normalizedImages = useMemo(() => images.map((image) => image?.value || image), []);
  useLayoutEffect(() => {
    normalizedImages.forEach((image) => {
      if (image && !isFontAwesomeIRI(image)) {
        getImage(image);
      }
    });
  }, normalizedImages);

  const hoverStyles = useMemo(() => {
    const result = {};
    normalizedImages.forEach((image) => {
      result[image] = getStyle(image, false, theme);
    });

    return result;
  }, normalizedImages);
  const styles = useMemo(() => {
    const result = {};
    normalizedImages.forEach((image) => {
      result[image] = getStyle(image, true, theme);
    });

    return result;
  }, normalizedImages);

  return {
    hoverStyles,
    styles,
  };
};
