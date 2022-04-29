import { useTheme } from '@mui/material';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import React from 'react';

import { MAX_POSTAL_DIGITS, MIN_POSTAL_DIGITS } from '../../../../components/Input/PostalRangeInput';
import { Layer } from '../../../MapView/components/MapView';
import { Events } from '../../components/GlappMap';
import { postalCodeIri } from '../../views/Glapp/helpers';
import { getStyles } from '../../../MapView/async/lib/helpers';

const useEventsLayer = (eventsData?: Events): Layer => {
  const [eventsFeatures, setEventsFeatures] = React.useState<Feature[]>([]);
  const theme = useTheme();

  React.useEffect(() => {
    if (eventsData) {
      const newEvents: Feature[] = [];

      for (let digits = MIN_POSTAL_DIGITS; digits <= MAX_POSTAL_DIGITS; digits++) {
        const iri = postalCodeIri(digits.toString()).value;

        if (eventsData[iri]) {
          const {
            image,
            events,
            lat,
            lon,
          } = eventsData[iri];
          const {
            hoverStyle,
            style,
          } = getStyles(image, theme);
          events.forEach((event) => {
            const f = new Feature(new Point(fromLonLat([lon, lat])));
            f.setId(event);
            f.setProperties({
              hoverStyle,
              location: digits,
              style,
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

export default useEventsLayer;
