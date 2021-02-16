import * as foaf from '@ontologies/foaf';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
  useResourceProperty,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import ResourceBoundary from '../../components/ResourceBoundary';
import ontola from '../../ontology/ontola';
import { radioGroupTopology } from '../../topologies/RadioGroup';

const ThingRadioGroup = ({
  itemClass,
  wrapperProps,
}) => {
  const labels = [schema.name, rdfs.label, foaf.name];

  const [label] = useResourceProperty(itemClass, ontola['forms/inputs/select/displayProp']);

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
  style: PropTypes.shape({}),
  wrapperProps: PropTypes.shape({}),
};

export default register(ThingRadioGroup);
