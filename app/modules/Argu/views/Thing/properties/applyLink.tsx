import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  PropertyProps,
  register,
  useLRS,
} from 'link-redux';
import React, { MouseEventHandler } from 'react';
import FontAwesome from 'react-fontawesome';

import { CopyToClipboard } from '../../../../Common/middleware/actions';
import { tableRowTopology } from '../../../../Table/topologies';
import argu from '../../../ontology/argu';

const useStyles = makeStyles(() => ({
  wrapper: {
    whiteSpace: 'nowrap',
  },
}));

const ApplyLink = ({ linkedProp }: PropertyProps) => {
  const lrs = useLRS();
  const classes = useStyles();
  const handleClick = React.useCallback<MouseEventHandler>((e) => {
    e.preventDefault();

    if (isNamedNode(linkedProp)) {
      lrs.actions.get(CopyToClipboard)(linkedProp.value);
    }
  }, [linkedProp]);

  if (!linkedProp?.value) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <IconButton
        href={linkedProp.value}
        size="small"
        target="_blank"
        title="Copy to clipboard"
        onClick={handleClick}
      >
        <FontAwesome name="copy" />
      </IconButton>
      {linkedProp.value}
    </div>
  );
};

ApplyLink.type = schema.Thing;

ApplyLink.property = [
  argu.applyLink,
  schema.url,
];

ApplyLink.topology = tableRowTopology;

export default register(ApplyLink);
