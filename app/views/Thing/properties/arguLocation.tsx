import rdf, { isNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useDataFetching,
  useLRS,
} from 'link-redux';
import React from 'react';
import { useHistory } from 'react-router';

import { LoadingCard } from '../../../components/Loading';
import MapView from '../../../containers/MapView';
import { listToArr } from '../../../helpers/data';
import { retrievePath } from '../../../helpers/iris';
import { isResource } from '../../../helpers/types';
import useCreateChildHandler from '../../../hooks/useCreateChildHandler';
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
  const history = useHistory();
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
  const children = listToArr(lrs, [], childrenPlacements);

  if (!Array.isArray(children)) {
    return <LoadingCard />;
  }

  if (!linkedProp && children.length === 0) {
    return null;
  }

  return (
    <MapView
      large={large}
      navigate={(resource) => history.push(retrievePath(resource.value) ?? '#')}
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
