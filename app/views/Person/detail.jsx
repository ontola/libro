import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link } from 'link-redux';
import PropTypes from 'prop-types';
import { Literal } from 'rdflib';
import React from 'react';

import {
  Detail,
  LDLink,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  name: PropTypes.instanceOf(Literal),
};

const PersonDetail = ({ name }) => (
  <LDLink>
    <Detail linkedImage text={name.value} />
  </LDLink>
);

PersonDetail.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  link([NS.schema('name')])(PersonDetail),
  NS.schema('Person'),
  RENDER_CLASS_NAME,
  NS.argu('detail')
);
