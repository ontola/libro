import * as fa from 'fontawesome';
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
const ICON_X = 8;
const ICON_Y = 19;
const IMG_SIZE = 26;

const generateMarkerImage = (image, highlight = false) => {
  let text = '\uf041';
  if (isFontAwesomeIRI(image)) {
    text = fa(normalizeFontAwesomeIRI(image));
  }

  const canvas = document.createElement('canvas');
  const canvasCtx = canvas.getContext('2d');
  const vectorContext = toContext(canvasCtx, {
    pixelRatio: 1,
    size: [100, 100],
  });

  const fill = new Fill({ color: highlight ? '#92a1b5' : '#475668' });
  const stroke = new Stroke({
    color: 'white',
    width: 2,
  });
  const circleStyle = new Style({
    fill,
    image: new CircleStyle({
      fill,
      radius: 10,
      stroke,
    }),
    stroke,
  });

  const circle = new Circle([CIRCLE_SIZE, CIRCLE_SIZE], CIRCLE_RADIUS);

  vectorContext.setStyle(circleStyle);
  vectorContext.drawGeometry(circle);

  canvasCtx.fillStyle = 'white';
  canvasCtx.font = 'normal 18px FontAwesome';
  canvasCtx.fillText(text, ICON_X, ICON_Y);

  return new Style({
    image: new Icon({
      anchor: [ANCHOR_X_CENTER, ANCHOR_Y_BOTTOM],
      img: canvas,
      imgSize: [IMG_SIZE, IMG_SIZE],
    }),
  });
};

export const getImages = (image, iconCache, setIconCache) => {
  const cacheKey = image;
  if (iconCache[cacheKey]) {
    return iconCache[cacheKey];
  }

  const newIconCache = { ...iconCache };
  newIconCache[cacheKey] = [
    generateMarkerImage(image, false),
    generateMarkerImage(image, true),
  ];
  setIconCache(newIconCache);

  return newIconCache[cacheKey];
};
