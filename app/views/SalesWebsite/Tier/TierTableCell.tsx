import {
  FC,
  register,
  useStrings,
} from 'link-redux';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import * as schema from '@ontologies/schema';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

import sales from '../../../ontology/sales';
import { tableCellTopology } from '../../../topologies';

interface StyleProps {
  color: string;
}

const useStyles = makeStyles<void, StyleProps>({
  icon: {
    color: ({ color }) => color,
  },
});

const TierTableCell: FC = () => {
  const [color] = useStrings(schema.color);

  const classes = useStyles({ color });

  return (
    <CheckCircleIcon className={classes.icon} />
  );
};

TierTableCell.type = sales.Tier;
TierTableCell.topology = tableCellTopology;

export default register(TierTableCell);
