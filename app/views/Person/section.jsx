import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link } from 'link-redux';
import PropTypes from 'prop-types';
import { Literal } from 'rdflib';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  name: PropTypes.instanceOf(Literal),
};

const PersonSection = ({ name }) => (
  <b style={{ color: 'grey', fontWeight: 'bold' }}>{name.value}</b>
);

PersonSection.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  link([NS.schema('name')])(PersonSection),
  NS.schema('Person'),
  RENDER_CLASS_NAME,
  NS.argu('section')
);
