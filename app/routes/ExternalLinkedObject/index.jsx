import rdf from '@ontologies/core';
import PropTypes from 'prop-types';
import React from 'react';

import LinkedObject from '../LinkedObject';

const ExternalLinkedObject = ({ location, ...otherProps }) => {
  const iri = new URLSearchParams(location.search).get('iri');

  return (
    <LinkedObject iri={rdf.namedNode(iri)} {...otherProps} />
  );
};

ExternalLinkedObject.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }),
};

export default ExternalLinkedObject;
