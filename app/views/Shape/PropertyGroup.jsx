import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, linkPropType } from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { allTopologies, NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  label: linkPropType,
  properties: PropTypes.node,
};

const PropertyGroup = ({ properties, label }) => (
  <fieldset>
    <legend>{label.value}</legend>
    <hr />
    {properties}
  </fieldset>
);

PropertyGroup.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  link([NS.rdfs('label')])(PropertyGroup),
  NS.sh('PropertyGroup'),
  RENDER_CLASS_NAME,
  allTopologies
);
