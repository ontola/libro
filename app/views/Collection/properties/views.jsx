import { getValueOrID } from 'link-lib';
import { contextTypes, getLinkedObjectPropertyRaw, LinkedObjectContainer } from 'link-redux';
import PropTypes from 'prop-types';
import rdf from 'rdflib';
import React from 'react';

import {
  Columns,
} from '../../../components';
import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const Views = (props, context) => {
  const prop = getLinkedObjectPropertyRaw(props.label, props, context);
  if (typeof prop === 'string') {
    return <LinkedObjectContainer object={prop} />;
  }
  const obs = prop.map(iri => <LinkedObjectContainer object={getValueOrID(iri)} />);
  if (obs && obs.length > 1) {
    return <Columns>{obs}</Columns>;
  } else if (obs) {
    return <div>{obs}</div>;
  }
  return null;
};

Views.contextTypes = contextTypes;
Views.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]).isRequired,
  subject: PropTypes.instanceOf(rdf.NamedNode)
};

LinkedRenderStore.registerRenderer(
  Views,
  NS.argu('Collection'),
  NS.argu('views')
);
LinkedRenderStore.registerRenderer(
  Views,
  NS.argu('Collection'),
  NS.argu('views'),
  NS.argu('section')
);

export default Views;
