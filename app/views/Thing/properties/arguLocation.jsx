import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  linkType,
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
import argu from '../../../ontology/argu';
import { containerTopology } from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { gridTopology } from '../../../topologies/Grid';

const ArguLocation = ({
  childrenPlacements,
  schemaLocation,
}) => {
  const lrs = useLRS();
  useDataFetching(childrenPlacements);
  const history = useHistory();
  const [selected, setSelected] = React.useState(null);
  const children = listToArr(lrs, [], childrenPlacements);

  const onSelect = (feature) => {
    const id = feature?.getId();
    if (!id) {
      setSelected(null);
    } else {
      setSelected(
        lrs.getResourceProperty(
          id.termType ? id : rdf.namedNode(id),
          schema.isPartOf
        )
      );
    }
  };

  if (!isResource(schemaLocation)) {
    return null;
  }

  if (!Array.isArray(children)) {
    return <LoadingCard />;
  }

  if (!schemaLocation && children.length === 0) {
    return null;
  }

  return (
    <MapView
      navigate={(resource) => history.push(retrievePath(resource.value))}
      overlayResource={selected}
      placements={[schemaLocation, ...children].filter(Boolean)}
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
  schemaLocation: schema.location,
};

ArguLocation.propTypes = {
  childrenPlacements: linkType,
  schemaLocation: linkType,
};

export default register(ArguLocation);
