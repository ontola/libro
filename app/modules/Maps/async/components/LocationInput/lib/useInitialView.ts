import * as schema from '@ontologies/schema';
import {
  ReturnType,
  dig,
  useIds,
  useResourceLink,
} from 'link-redux';
import React from 'react';

import ontola from '../../../../../../ontology/ontola';
import { formContext } from '../../../../../../components/Form/FormContext';

const viewMapping = {
  lat: schema.latitude,
  lon: schema.longitude,
  zoom: ontola.zoomLevel,
};

interface InitialView {
  lat: number;
  lon: number;
  zoom: number;
}

export const useIntialView = (): InitialView => {
  const { parentObject } = React.useContext(formContext);
  const [parentLocation] = useIds(parentObject, dig(schema.isPartOf, schema.location));

  return useResourceLink(
    parentLocation,
    viewMapping,
    { returnType: ReturnType.Literal },
  ) as InitialView;
};

