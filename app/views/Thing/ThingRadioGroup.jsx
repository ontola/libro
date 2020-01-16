import foaf from '@ontologies/foaf';
import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  lrsType,
  register,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { ResourceBoundary } from '../../components';
import ontola from '../../ontology/ontola';
import { radioGroupTopology } from '../../topologies/RadioGroup';

const ThingRadioGroup = ({
  lrs,
  itemClass,
  wrapperProps,
}) => {
  const labels = [schema.name, rdfs.label, foaf.name];

  const label = lrs.getResourceProperty(itemClass, ontola.ns('forms/inputs/select/displayProp'));

  if (label) {
    labels.unshift(label);
  }

  return (
    <ResourceBoundary element="span" wrapperProps={wrapperProps}>
      <Property label={labels} />
    </ResourceBoundary>
  );
};

ThingRadioGroup.type = schema.Thing;

ThingRadioGroup.topology = radioGroupTopology;

ThingRadioGroup.mapDataToProps = {
  itemClass: rdfx.type,
};

ThingRadioGroup.propTypes = {
  itemClass: linkType,
  lrs: lrsType,
  style: PropTypes.shape({}),
  wrapperProps: PropTypes.shape({}),
};

export default register(ThingRadioGroup);
