import LinkedRenderStore from 'link-lib';
import { PropertyProps } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import teamGL from '../../../../../ontology/teamGL';
import { allTopologiesExcept } from '../../../../../topologies';
import { tableRowTopology } from '../../../../../topologies/TableRow';

const Telephone = ({ linkedProp }: PropertyProps) => (
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

export default LinkedRenderStore.registerRenderer(
  Telephone,
  teamGL.Volunteer,
  teamGL.telephone,
  allTopologiesExcept(tableRowTopology),
);
