import MaterialToggleButton from '@material-ui/lab/ToggleButton';
import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import { Property, Resource } from 'link-redux';
import React from 'react';

import { useMenuItemStyles, useNormalizeAction } from './helpers';

export const ToggleButton = ({ item, marks }) => {
  const classes = useMenuItemStyles();
  const action = useNormalizeAction(item.action, item);

  return (
    <MaterialToggleButton
      className={classes.button}
      selected={marks.includes(rdf.toNQ(item.mark))}
      title={item.name.value}
      value={rdf.toNQ(item.mark)}
      onClick={action}
    >
      <Resource subject={item.subject}>
        <Property label={schema.image} />
      </Resource>
    </MaterialToggleButton>
  );
};
