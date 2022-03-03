import { Theme } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import fa from 'fontawesome';
import { Feature } from 'ol';
import Circle from 'ol/geom/Circle';
import { toContext } from 'ol/render';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';

import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../../../helpers/iris';

interface IconProps {
  background: {
    background: string;
    backgroundHover: string;
    text: string;
  }
  text: {
    color: string;
    fontFamily: string | undefined;
  }
}

const ANCHOR_Y_CENTER = 0.5;
const ANCHOR_X_CENTER = 0.5;

export const BACKGROUND_FADE = 0.5;
export const TEXT_FADE = 0.8;
const CIRCLE_RADIUS = 14;
const CIRCLE_SIZE = 15;
const ICON_X = CIRCLE_SIZE;
const ICON_Y = CIRCLE_SIZE;
const IMG_SIZE = 30;

const iconCache: { [k: string]: Style } = {};

const drawFontAwesomeIcon = (
  canvasCtx: CanvasRenderingContext2D,
  text: string,
  highlight: boolean,
  count: number,
  iconProps: IconProps,
) => {
  const { background, backgroundHover } = iconProps.background;
  const { color, fontFamily } = iconProps.text;

  const circleBackground = new Fill({
    color: highlight ? backgroundHover : background,
  });
  const circleStroke = new Stroke({
    color,
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

  const [renderText, renderFont] = (count > 1)
    ? [count.toString(), `bold 16px ${fontFamily}`]
    : [text, 'normal 18px FontAwesome'];

  /* eslint-disable no-param-reassign */
  canvasCtx.fillStyle = color;
  canvasCtx.font = renderFont;
  canvasCtx.textAlign = 'center';
  canvasCtx.textBaseline = 'middle';
  /* eslint-enable no-param-reassign */
  canvasCtx.fillText(renderText, ICON_X, ICON_Y);
};

const generateIconStyle = (
  image: string,
  highlight = false,
  count: number,
  iconProps: IconProps,
) => {
  const canvas = document.createElement('canvas');
  const canvasCtx = canvas.getContext('2d');

  if (canvasCtx && isFontAwesomeIRI(image)) {
    drawFontAwesomeIcon(canvasCtx, fa(normalizeFontAwesomeIRI(image)), highlight, count, iconProps);
  }

  return new Style({
    image: new Icon({
      anchor: [ANCHOR_X_CENTER, ANCHOR_Y_CENTER],
      img: canvas,
      imgSize: [IMG_SIZE, IMG_SIZE],
    }),
  });
};

export const featureCount = (feature: Feature): number => (
  feature?.get('features')?.length || 0
);

export const allFeaturesVisited = (feature: Feature): boolean =>
  feature.get('features')?.every(
    (f: Feature) => f.getProperties().visited,
  ) ?? true;

const getIconProps = (theme: Theme, visited: boolean): IconProps => {
  const defaultIconProps = {
    background: {
      ...theme.palette.mapIcon,
    },
    text: {
      color: '#ffffff',
      fontFamily: theme.typography.h1.fontFamily,
    },
  };
  const visitedIconProps = {
    background: {
      ...defaultIconProps.background,
      background: alpha(defaultIconProps.background.background, BACKGROUND_FADE),
    },
    text: {
      ...defaultIconProps.text,
      color: alpha(defaultIconProps.text.color, TEXT_FADE),
    },
  };

  return visited ? visitedIconProps : defaultIconProps;
};

const getStyle = (
  image: string,
  highlight: boolean,
  theme: Theme,
) => (feature: Feature) => {
  const count = featureCount(feature);
  const featuresVisited = allFeaturesVisited(feature);
  const cacheKey = [
    image,
    highlight,
    count,
    featuresVisited ? 'visited' : '',
  ].filter(Boolean).join('-');

  if (!iconCache[cacheKey]) {
    const icon = generateIconStyle(
      image,
      highlight,
      count,
      getIconProps(theme, featuresVisited),
    );

    iconCache[cacheKey] = icon;
  }

  return iconCache[cacheKey];
};

export const getStyles = (image: string, theme: Theme): {
  hoverStyle: (feature: Feature) => Style,
  style: (feature: Feature) => Style,
} => ({
  hoverStyle: getStyle(image, true, theme),
  style: getStyle(image, false, theme),
});
