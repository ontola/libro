import LinkedRenderStore from 'link-lib';
import { PropertyProps } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import { allTopologiesExcept } from '../../../../../topologies';
import { tableRowTopology } from '../../../../Table/topologies/TableRow';
import teamGL from '../../../ontology/teamGL';
import { useContactOptionStyles } from '../useContactOptionStyles';

const Telephone = ({ linkedProp }: PropertyProps) => {
  const classes = useContactOptionStyles();

  return (
    <div className={classes.volunteerContactOption}>
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
};

export default LinkedRenderStore.registerRenderer(
  Telephone,
  teamGL.Volunteer,
  teamGL.telephone,
  allTopologiesExcept(tableRowTopology),
);
