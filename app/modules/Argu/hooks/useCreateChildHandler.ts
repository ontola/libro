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
import React from 'react';

import { useValidActions } from '../../Action/hooks/useValidActions';
import { ShowDialog } from '../../Common/middleware/actions';
import { conditionalFormFieldsPath, formFieldsPath } from '../../Form/lib/diggers';
import ll from '../../Kernel/ontology/ll';
import ontola from '../../Kernel/ontology/ontola';
import { MapInteractionCallback } from '../../Map/components/ControlledMap';
import { GeometryType } from '../../Map/lib/geometry';

const useCreateChildHandler = (): MapInteractionCallback | undefined => {
  const lrs = useLRS();
  const createActions = useValidActions(useGlobalIds(ontola.createAction));
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
    if (newGeometry.type === GeometryType.POINT && locationActions.length === 1) {
      const { lat, lon } = newGeometry.points[0];
      const action = locationActions[0];
      let location = action?.value || '';
      location += `?filter%5B%5D=http%253A%252F%252Fschema.org%252Flatitude%3D${lat}`;
      location += `&filter%5B%5D=http%253A%252F%252Fschema.org%252Flongitude%3D${lon}`;
      location += `&filter%5B%5D=https%253A%252F%252Fns.ontola.io%252Fcore%2523zoomLevel%3D${zoom}`;
      lrs.actions.get(ShowDialog)(rdf.namedNode(location));
    }
  }, [locationActions]);

  return locationActions.length === 0 ? undefined : createChildHandler;
};

export default useCreateChildHandler;
