import { useTheme } from '@material-ui/core';
import rdf from '@ontologies/core';
import {
  useLRS,
  useResourceProperty,
} from 'link-redux';
import { Feature } from 'ol';
import { extend } from 'ol/extent';
import GeoJSON from 'ol/format/GeoJSON';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import withReducer from '../../containers/withReducer';
import { fontAwesomeIRI, normalizeFontAwesomeIRI } from '../../helpers/iris';
import { tryParseFloat } from '../../helpers/numbers';
import app from '../../ontology/app';
import teamGL from '../../ontology/teamGL';
import { requestAsset } from '../../state/assets/actions';
import { getAsset } from '../../state/assets/selectors';
import {
  MAX_POSTAL_DIGITS,
  MIN_POSTAL_DIGITS,
  postalCodeIri,
} from '../../views/Glapp/helpers';

import { useImageStyles } from './helpers';
import MapCanvas from './MapCanvas';
import reducer, { MapReducerKey } from './reducer';

const EVENT_ICONS = ['envelope', 'home', 'comments-o', 'calendar-check-o'].map(fontAwesomeIRI);
const FULL_POSTAL_LEVEL = 8.6;
const HALF = 0.5;
const INITIAL_ZOOM = 7.3;
const SHADE_COUNT = 10;

const selectedShapeStyle = new Style({
  fill: new Fill({
    color: 'hsla(120, 64%, 40%, 0.60)',
  }),
  stroke: new Stroke({
    color: '#323232',
    width: 5,
  }),
});
const hoverShapeStyle = new Style({
  fill: new Fill({
    color: 'hsla(120, 64%, 60%, 0.60)',
  }),
  stroke: new Stroke({
    color: '#323232',
    width: 1,
  }),
});
const shapeStyle = {};
for (let i = 0; i <= SHADE_COUNT; i++) {
  /* eslint-disable no-magic-numbers */
  const fillColor = `hsla(120, 64%, ${(65 - (5 * i)).toFixed()}%, ${(0.2 + 0.06 * i).toFixed(2)})`;
  /* eslint-enable no-magic-numbers */

  shapeStyle[i] = new Style({
    fill: new Fill({
      color: fillColor,
    }),
  });
}

const styleForPostalCode = (lrs, style, feature, maxPriority, minPriority, priorities) => {
  const { postalDigits } = feature.getProperties();

  const priority = priorities[postalCodeIri(postalDigits).value];
  const range = maxPriority - minPriority;
  const prioIndex = (
    SHADE_COUNT * (Math.max(0, (Math.min(priority, maxPriority) - minPriority)) / range)
  ).toFixed();

  return style[prioIndex];
};

const useStyleForPostalCode = (lrs, priorities) => {
  const [maxPriorityProp] = useResourceProperty(app.c_a, teamGL.maxPriority);
  const maxPriority = tryParseFloat(maxPriorityProp);
  const [minPriorityProp] = useResourceProperty(app.c_a, teamGL.minPriority);
  const minPriority = tryParseFloat(minPriorityProp);

  const style = React.useCallback((feature) => (
    styleForPostalCode(lrs, shapeStyle, feature, maxPriority, minPriority, priorities)
  ));

  return style;
};

const usePostalShapes = ({
  lrs,
  priorities,
  postalCodes,
  showFull,
}) => {
  const postalCodeStyle = useStyleForPostalCode(lrs, priorities);
  const [postalShapes, setPostalShapes] = React.useState({});

  React.useEffect(() => {
    if (priorities && postalCodes) {
      const postalMapping = {};
      const features = (new GeoJSON()).readFeatures(postalCodes);
      features.forEach((f) => {
        f.setProperties({
          hoverStyle: () => hoverShapeStyle,
          style: postalCodeStyle,
        });

        const { postalDigits } = f.getProperties();
        if (!postalMapping[postalDigits]) {
          postalMapping[postalDigits] = [];
        }
        postalMapping[postalDigits].push(f);
      });

      setPostalShapes(postalMapping);
    }
  }, [!!postalCodes, !!priorities, showFull]);

  return postalShapes;
};

const useSelectedPostalCode = ({
  postalShapes,
  selectedPostalCode,
  setOverlayPosition,
}) => {
  const [selectedFeatures, setSelectedFeatures] = React.useState([]);

  React.useEffect(() => {
    if (selectedPostalCode && postalShapes[selectedPostalCode]) {
      const cloned = postalShapes[selectedPostalCode].map((f) => {
        const clone = f.clone();
        clone.setProperties({
          hoverStyle: () => selectedShapeStyle,
          style: () => selectedShapeStyle,
        });

        return clone;
      });
      const [minX, minY, maxX] = postalShapes[selectedPostalCode].reduce((acc, next) => {
        const ext = next.getGeometry().getExtent();

        return acc ? extend(acc, ext) : ext;
      }, null);
      const center = [HALF * (minX + maxX), minY];
      setOverlayPosition(center);
      setSelectedFeatures(cloned);
    } else {
      setSelectedFeatures([]);
    }
  }, [selectedPostalCode]);

  return selectedFeatures;
};

const useEventsLayer = (lrs, eventsData) => {
  const [eventsFeatures, setEventsFeatures] = React.useState([]);
  const theme = useTheme();
  const {
    styles,
    hoverStyles,
  } = useImageStyles(EVENT_ICONS, theme);

  React.useEffect(() => {
    if (eventsData) {
      const newEvents = [];

      for (let digits = MIN_POSTAL_DIGITS; digits <= MAX_POSTAL_DIGITS; digits++) {
        const iri = postalCodeIri(digits).value;
        if (eventsData[iri]) {
          const {
            image,
            events,
            lat,
            lon,
          } = eventsData[iri];
          events.forEach((event) => {
            const f = new Feature(new Point(fromLonLat([lon, lat])));
            f.local = event;
            f.setId(event);
            f.setProperties({
              hoverStyle: hoverStyles[normalizeFontAwesomeIRI(image)],
              style: styles[normalizeFontAwesomeIRI(image)],
            });
            newEvents.push(f);
          });
        }
      }

      setEventsFeatures(newEvents);
    }
  }, [!!eventsData]);

  return React.useMemo(() => ({
    clustered: true,
    features: eventsFeatures,
  }), [eventsFeatures]);
};

const GlappMap = ({
  postalCodesFull,
  postalCodesSimplified,
  postalStats,
  requestPostalCodes,
  requestPostalStats,
}) => {
  const lrs = useLRS();
  const [selectedPostalCode, setSelectedPostalCode] = React.useState(null);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [zoom, setZoom] = React.useState(INITIAL_ZOOM);
  const showFull = zoom > FULL_POSTAL_LEVEL;
  const postalCodes = showFull ? postalCodesFull : postalCodesSimplified;
  React.useEffect(() => {
    if (!postalStats) {
      requestPostalStats();
    }
  }, [!!postalStats]);
  React.useEffect(() => {
    if (!postalCodes) {
      requestPostalCodes(showFull);
    }
  }, [!!postalCodes]);
  const postalShapes = usePostalShapes({
    lrs,
    postalCodes,
    priorities: postalStats?.priorities,
    showFull,
  });
  const [overlayPosition, setOverlayPosition] = React.useState(null);
  const [selectedFeatures] = useSelectedPostalCode({
    postalShapes,
    selectedPostalCode,
    setOverlayPosition,
  });
  const eventsLayer = useEventsLayer(lrs, postalStats?.events);
  const layers = React.useMemo(() => ([
    { features: Object.values(postalShapes).flat() },
    { features: selectedFeatures },
    eventsLayer,
  ]), [postalShapes, eventsLayer, selectedFeatures]);

  return (
    <MapCanvas
      large
      initialZoom={INITIAL_ZOOM}
      layers={layers}
      overlayPosition={overlayPosition}
      overlayResource={selectedPostalCode ? postalCodeIri(selectedPostalCode) : selectedEvent}
      onSelect={(feature, newCenter) => {
        const { postalDigits } = feature?.getProperties() || {};
        if (postalDigits) {
          setSelectedPostalCode(postalDigits);
          setSelectedEvent(null);
        } else {
          setSelectedPostalCode(null);
          const iri = feature?.getId() ? rdf.namedNode(feature.getId()) : null;
          setSelectedEvent(iri);
          setOverlayPosition(newCenter);
        }
      }}
      onZoom={setZoom}
    />
  );
};

GlappMap.propTypes = {
  postalCodesFull: PropTypes.shape({
    features: PropTypes.arrayOf(PropTypes.any),
    type: PropTypes.string,
  }),
  postalCodesSimplified: PropTypes.shape({
    features: PropTypes.arrayOf(PropTypes.any),
    type: PropTypes.string,
  }),
  postalStats: PropTypes.shape({
    events: PropTypes.objectOf(
      PropTypes.shape({
        events: PropTypes.arrayOf(PropTypes.string),
        lat: PropTypes.number,
        lon: PropTypes.number,
      })
    ),
    priorities: PropTypes.objectOf(PropTypes.number),
  }),
  requestPostalCodes: PropTypes.func,
  requestPostalStats: PropTypes.func,
};

const mapStateToProps = (state) => ({
  postalCodesFull: getAsset(state, 'assets/postal_codes.json'),
  postalCodesSimplified: getAsset(state, 'assets/postal_codes_simplified.json'),
  postalStats: getAsset(state, 'postal_stats.json'),
});

const mapDispatchToProps = (dispatch) => ({
  requestPostalCodes: (showFull) => dispatch(requestAsset(`assets/postal_codes${showFull ? '' : '_simplified'}.json`)),
  requestPostalStats: () => dispatch(requestAsset('postal_stats.json')),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withReducer(MapReducerKey, reducer)(GlappMap)
);
