import rdf, { isNamedNode, isNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useDataFetching,
  useLRS,
} from 'link-redux';
import React from 'react';

import { LoadingCard } from '../../../components/Loading';
import MapView from '../../../containers/MapView';
import { listToArr } from '../../../helpers/data';
import { isResource } from '../../../helpers/types';
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
  const children = listToArr(lrs, [], childrenPlacements);

  if (!isResource(linkedProp)) {
    return null;
  }

  if (!Array.isArray(children)) {
    return <LoadingCard />;
  }

  if (!linkedProp && children.length === 0) {
    return null;
  }

  return (
    <MapView
      large={large}
      navigate={handleNavigate}
      placements={[
        linkedProp,
        ...children.filter(isNode).filter((child) => child !== linkedProp),
      ].filter(Boolean)}
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
