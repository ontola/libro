import * as schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { PropertyProps } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import teamGL from '../../../ontology/teamGL';
import { allTopologiesExcept, tableRowTopology } from '../../../../../topologies';
import { useContactOptionStyles } from '../useContactOptionStyles';

const Email = ({ linkedProp }: PropertyProps) => {
  const classes = useContactOptionStyles();

  return (
    <div className={classes.volunteerContactOption}>
      <a
        href={`mailto:${linkedProp.value}`}
        target="_top"
      >
        {emoji(`📩 ${linkedProp.value}`)}
      </a>
    </div>
  );
};

export default LinkedRenderStore.registerRenderer(
  Email,
  teamGL.Volunteer,
  schema.email,
  allTopologiesExcept(tableRowTopology),
);
