import rdf, { isNamedNode, isNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import {
  useDataFetching,
  useIds,
  useLRS,
  useResourceLinks,
} from 'link-redux';
import React from 'react';

import { MapClickCallback } from '../containers/MapView';
import { conditionalFormFieldsPath, formFieldsPath } from '../helpers/diggers';
import ll from '../ontology/ll';
import ontola from '../ontology/ontola';

const useCreateChildHandler = (): MapClickCallback | undefined => {
  const lrs = useLRS();
  const createActions = useIds(ontola.createAction);
  const actionProps = useResourceLinks(createActions, {
    entryPoint: schema.target,
    status: schema.actionStatus,
  }).filter(({ status }) => status === schema.PotentialActionStatus);
  const entryPoints = React.useMemo(() => (
    actionProps
      .map(({ entryPoint }) => entryPoint)
      .filter(isNamedNode)
  ), [actionProps]);
  const entryPointsProps = useResourceLinks(
    entryPoints ?? [],
    {
      action: schema.isPartOf,
      form: ll.actionBody,
    },
  );
  const forms = React.useMemo(() => (
    entryPointsProps.map(({ form }) => form).filter(isNode)
  ), [entryPointsProps]);

  useDataFetching(entryPoints);
  useDataFetching(forms);

  const locationActions = React.useMemo(() => (
    entryPointsProps
      .filter(({ form }) => (
        isNamedNode(form)
      && (lrs.dig(form, [...formFieldsPath, sh.path]).concat(
        lrs.dig(form, [...conditionalFormFieldsPath, sh.path]),
      )).includes(schema.location)
      )).map(({ action }) => action)
  ), [entryPointsProps]);

  const createChildHandler = React.useCallback((lon, lat, zoom) => {
    if (locationActions.length > 0) {
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
