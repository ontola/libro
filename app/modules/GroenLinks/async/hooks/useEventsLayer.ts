import { useTheme } from '@material-ui/core';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import React from 'react';

import { MAX_POSTAL_DIGITS, MIN_POSTAL_DIGITS } from '../../../../components/Input/PostalRangeInput';
import { Events } from '../../components/GlappMap';
import { postalCodeIri } from '../../views/Glapp/helpers';
import { getStyles } from '../../../../async/MapView/helpers';

interface EventsLayer {
  clustered: boolean;
  features: Feature[],
}

const useEventsLayer = (eventsData?: Events): EventsLayer => {
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