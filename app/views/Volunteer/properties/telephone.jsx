import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

const Telephone = ({ linkedProp }) => (
  <div className="Volunteer--contact-option">
    <a href={`tel:${linkedProp.value}`}>
      {emoji(`☎️ ${linkedProp.value}`)}

    </a>
    <a
      href={`https://wa.me/${linkedProp.value.replace(/^\D+/g, '')}`}
      rel="nofollow noopener noreferrer"
      target="_blank"
    >
      {emoji('💬 app')}
    </a>
  </div>
);

Telephone.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  Telephone,
  NS.teamGL('Volunteer'),
  NS.teamGL('telephone'),
  allTopologies
);
