import {
  Property,
  linkType,
  lrsType,
  register,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { Resource } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { radioGroupTopology } from '../../topologies/RadioGroup';

const ThingRadioGroup = ({
  lrs,
  itemClass,
  wrapperProps,
}) => {
  const labels = [NS.schema('name'), NS.rdfs('label')];

  const label = lrs.getResourceProperty(itemClass, NS.ontola('forms/inputs/select/displayProp'));

  if (label) {
    labels.unshift(label);
  }

  return (
    <Resource element="span" wrapperProps={wrapperProps}>
      <Property label={labels} />
    </Resource>
  );
};

ThingRadioGroup.type = NS.schema('Thing');

ThingRadioGroup.topology = radioGroupTopology;

ThingRadioGroup.mapDataToProps = {
  itemClass: NS.rdf('type'),
};

ThingRadioGroup.propTypes = {
  itemClass: linkType,
  lrs: lrsType,
  style: PropTypes.shape({}),
  wrapperProps: PropTypes.shape({}),
};

export default register(ThingRadioGroup);
