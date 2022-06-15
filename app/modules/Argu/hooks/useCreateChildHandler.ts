import rdf, { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import {
  useDataFetching,
  useGlobalIds,
  useIds,
  useLRS,
  useResourceLinks,
} from 'link-redux';
import GeometryType from 'ol/geom/GeometryType';
import React from 'react';

import ll from '../../../ontology/ll';
import ontola from '../../../ontology/ontola';
import { useEnabledActions } from '../../Action/hooks/useEnabledActions';
import { conditionalFormFieldsPath, formFieldsPath } from '../../Form/lib/diggers';
import { MapInteractionCallback } from '../../Map/components/ControlledMap';

const useCreateChildHandler = (): MapInteractionCallback | undefined => {
  const lrs = useLRS();
  const createActions = useEnabledActions(useGlobalIds(ontola.createAction));
  const entryPoints = useIds(createActions, schema.target).map((values) => values[0]);
  const forms = useIds(entryPoints, ll.actionBody).map((values) => values[0]);
  useDataFetching([...entryPoints, ...forms]);
  const entryPointsProps = useResourceLinks(
    entryPoints,
    {
      action: schema.isPartOf,
      form: ll.actionBody,
    },
  );
  const locationActions = React.useMemo(() => (
    entryPointsProps.filter(({ form }) => (
      isNamedNode(form) && (
        lrs.dig(form, [...formFieldsPath, sh.path]).concat(
          lrs.dig(form, [...conditionalFormFieldsPath, sh.path]),
        )
      ).includes(schema.location)
    )).map(({ action }) => action)
  ), [entryPointsProps]);

  const createChildHandler = React.useCallback<MapInteractionCallback>((newGeometry, zoom) => {
    if (newGeometry.type === GeometryType.POINT && locationActions.length > 0) {
      const { lat, lon } = newGeometry.points[0];
      const action = locationActions[0];
      let location = action?.value || '';
      location += `?filter%5B%5D=http%253A%252F%252Fschema.org%252Flatitude%3D${lat}`;
      location += `&filter%5B%5D=http%253A%252F%252Fschema.org%252Flongitude%3D${lon}`;
      location += `&filter%5B%5D=https%253A%252F%252Fns.ontola.io%252Fcore%2523zoomLevel%3D${zoom}`;
      lrs.actions.ontola.showDialog(rdf.namedNode(location));
    }
  }, [locationActions]);

  return locationActions.length === 0 ? undefined : createChildHandler;
};

export default useCreateChildHandler;
