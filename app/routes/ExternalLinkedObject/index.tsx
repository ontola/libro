import rdf from '@ontologies/core';
import { Location } from 'history';
import React from 'react';

import LinkedObject from '../LinkedObject';

interface ExternalLinkedObjectProps {
  location: Location;
}

const ExternalLinkedObject = ({
  location,
  ...otherProps
}: ExternalLinkedObjectProps): JSX.Element => {
  const iri = new URLSearchParams(location.search).get('iri');

  return (
    <LinkedObject
      iri={rdf.namedNode(iri)}
      location={location}
      {...otherProps}
    />
  );
};

export default ExternalLinkedObject;
