import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

const Email = ({ linkedProp }) => (
  <div className="Volunteer--contact-option">
    <a href={`mailto:${linkedProp.value}`} target="_top">
      {emoji(`📩 ${linkedProp.value}`)}
    </a>
  </div>
);

Email.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  Email,
  NS.teamGL('Volunteer'),
  NS.teamGL('email'),
  allTopologies
);
