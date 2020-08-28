import { isNamedNode } from '@ontologies/core';
import schema from '@ontologies/schema';
import * as fa from 'fontawesome';
import {
  linkType,
  useDataFetching,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import { Feature } from 'ol';
import Circle from 'ol/geom/Circle';
import Point from 'ol/geom/Point';
import { fromLonLat, toLonLat } from 'ol/proj';
import { toContext } from 'ol/render';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import PropTypes from 'prop-types';
import React from 'react';

import { LoadingCard } from '../../components/Loading';
import { entityIsLoaded } from '../../helpers/data';
import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../helpers/iris';
import { tryParseFloat } from '../../helpers/numbers';
import { isResource } from '../../helpers/types';
import ontola from '../../ontology/ontola';

import './Map.scss';

import MapCanvas from './MapCanvas';

const IMG_SIZE = 26;
const CIRCLE_RADIUS = 12;
const CIRCLE_SIZE = 13;
const ICON_X = 8;
const ICON_Y = 19;
const ANCHOR_X_CENTER = 0.5;
const ANCHOR_Y_BOTTOM = 1;

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

const getImages = (image, iconCache, setIconCache) => {
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

const featureProps = (lrs, placement) => {
  if (!isResource(placement)) {
    return placement;
  }

  const image = lrs.getResourceProperty(placement, schema.image);
  const lat = tryParseFloat(lrs.getResourceProperty(placement, schema.latitude));
  const lon = tryParseFloat(lrs.getResourceProperty(placement, schema.longitude));
  const zoomLevel = tryParseFloat(lrs.getResourceProperty(placement, ontola.zoomLevel));

  return {
    image,
    lat,
    lon,
    zoomLevel,
  };
};

const featureFromPlacement = (lrs, placement, iconCache, setIconCache) => {
  const {
    image,
    lat,
    lon,
    zoomLevel,
  } = featureProps(lrs, placement);

  if (!image) {
    return undefined;
  }

  const f = new Feature(new Point(fromLonLat([lon, lat])));
  f.local = placement;
  f.setId(placement.value);
  const [style, hoverStyle] = getImages(image.value, iconCache, setIconCache);
  f.setStyle(style);
  f.setProperties({
    hoverStyle,
    style,
    zoomLevel,
  });

  return f;
};

const useFeatures = (placements, center) => {
  const lrs = useLRS();

  const [loading, setLoading] = React.useState(true);
  const [memoizedFeatures, setMemoizedFeatures] = React.useState([]);
  const [memoizedCenter, setMemoizedCenter] = React.useState(null);
  const [memoizedDependencies, setDependencies] = React.useState([]);
  const [iconCache, setIconCache] = React.useState(() => ({}), []);
  const timestamp = useDataInvalidation(memoizedDependencies);
  useDataFetching(memoizedDependencies.filter(isNamedNode));

  React.useEffect(() => {
    const features = [];
    const dependencies = [];
    const addFeature = (rawFeature, index) => {
      const feature = !loading && featureFromPlacement(lrs, rawFeature, iconCache, setIconCache);

      const isCenter = rawFeature === center || (!center && index === 0);

      if (feature && isCenter) {
        setMemoizedCenter(feature);
      }

      dependencies.push(rawFeature);
      if (feature) {
        features.push(feature);
      }
    };

    if (placements) {
      placements.forEach(addFeature);
    }
    setDependencies(dependencies);
    setMemoizedFeatures(features);

    const currentlyLoading = memoizedDependencies.filter(isNamedNode).find((resource) => (
      !entityIsLoaded(lrs, resource)
    ));

    if (loading !== currentlyLoading) {
      setLoading(currentlyLoading);
    }
  }, [loading, timestamp, placements]);

  return [memoizedFeatures, memoizedCenter, loading];
};

const MapView = ({
  center,
  navigate,
  onMapClick,
  onSelect,
  onZoom,
  overlayResource,
  placements,
}) => {
  const [placementFeatures, resolvedCenter, loading] = useFeatures(placements, center);

  if (loading) {
    return <LoadingCard />;
  }

  const [cLon, cLat] = resolvedCenter
    ? toLonLat(resolvedCenter.getGeometry().getCoordinates())
    : [null, null];
  const zoom = resolvedCenter && resolvedCenter.getProperties().zoomLevel;

  return (
    <MapCanvas
      initialLat={cLat}
      initialLon={cLon}
      initialZoom={zoom}
      layers={[{ features: placementFeatures }]}
      navigate={navigate}
      overlayResource={overlayResource}
      onMapClick={onMapClick}
      onSelect={onSelect}
      onZoom={onZoom}
    />
  );
};

MapView.propTypes = {
  center: linkType,
  navigate: PropTypes.func,
  onMapClick: PropTypes.func,
  onSelect: PropTypes.func,
  onZoom: PropTypes.func,
  overlayResource: linkType,
  placements: linkType,
};

export default MapView;
