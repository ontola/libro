import rdf, {
  isNamedNode,
  isNode,
} from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useDataFetching,
  useLRS,
} from 'link-redux';
import React from 'react';

import MapView from '../../../containers/MapView';
import { isResource } from '../../../helpers/types';
import { useContainerToArr } from '../../../hooks/useContainerToArr';
import useCreateChildHandler from '../../../hooks/useCreateChildHandler';
import app from '../../../ontology/app';
import argu from '../../../ontology/argu';
import { containerTopology } from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { gridTopology } from '../../../topologies/Grid';

interface ArguLocationProps {
  childrenPlacements: SomeNode;
  large: boolean;
  linkedProp: SomeNode;
}

const ArguLocation: FC<ArguLocationProps> = ({
  childrenPlacements,
  large,
  linkedProp,
}) => {
  const lrs = useLRS();
  const onMapClick = useCreateChildHandler();
  useDataFetching(childrenPlacements);
  const [children, childrenLoading] = useContainerToArr(childrenPlacements);
  const onSelect = React.useCallback((feature) => {
    const id = feature?.getId();

    if (id) {
      const partOf = lrs.getResourceProperty(
        isResource(id) ? id : rdf.namedNode(id), schema.isPartOf,
      );

      if (partOf) {
        lrs.actions.ontola.showDialog(partOf);
      }
    }
  }, []);
  const handleNavigate = React.useCallback((resource) => (
    lrs.actions.ontola.navigate(isNamedNode(resource) ? resource : app.ns('#'))
  ), [lrs]);
  const placements = React.useMemo(() => (
    [
      linkedProp,
      ...children.filter(isNode).filter((child) => child !== linkedProp),
    ].filter(Boolean)
  ), [linkedProp, children]);

  if (!isResource(linkedProp)) {
    return null;
  }

  if (childrenLoading) {
    return (
      <MapView
        key="loading-map"
        large={large}
        placements={[linkedProp]}
      />
    );
  }

  return (
    <MapView
      large={large}
      navigate={handleNavigate}
      placements={placements}
      onMapClick={onMapClick}
      onSelect={onSelect}
    />
  );
};

ArguLocation.type = schema.Thing;

ArguLocation.property = schema.location;

ArguLocation.topology = [
  containerTopology,
  fullResourceTopology,
  gridTopology,
];

ArguLocation.mapDataToProps = {
  childrenPlacements: argu.childrenPlacements,
};

export default register(ArguLocation);
