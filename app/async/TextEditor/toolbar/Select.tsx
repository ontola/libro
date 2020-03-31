import MaterialMenuItem from '@material-ui/core/MenuItem';
import MaterialSelect from '@material-ui/core/Select';
import { Node } from '@ontologies/core';
import { seqToArray } from '@rdfdev/collections';
import { Resource, useLRS } from 'link-redux';
import React from 'react';
import { useSlate } from 'slate-react';

import ontola from '../../../ontology/ontola';
import SelectTopology from '../../../topologies/Select';
import Selected from '../../../topologies/Selected';

import { normalizeAction, useMenuItemStyles } from './helpers';

export const Select = ({ shIn, value }) => {
  const lrs = useLRS();
  const classes = useMenuItemStyles();
  const items = seqToArray(lrs.store, shIn);
  const textEditor = useSlate();
  const actionOpts = { textEditor };

  return (
    <SelectTopology elementType={React.Fragment}>
      <MaterialSelect
        classes={classes}
        className={classes.root}
        MenuProps={{
          anchorOrigin: {
            horizontal: 'left',
            vertical: 'bottom',
          },
          getContentAnchorEl: null,
        }}
        renderValue={(v) => (
          <Selected>
            <Resource subject={v} />
          </Selected>
        )}
        value={value}
        onChange={(e) => normalizeAction(
          lrs,
          lrs.getResourceProperty<Node>(e.target.value as Node, ontola.action)!,
          actionOpts,
        )(e)}
      >
        {items.map((i) => (
          <MaterialMenuItem key={i.value} value={i as any}>
            <Resource subject={i} />
          </MaterialMenuItem>
        ))}
      </MaterialSelect>
    </SelectTopology>
  );
};
