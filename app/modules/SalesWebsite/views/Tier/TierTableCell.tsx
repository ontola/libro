import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useStrings,
} from 'link-redux';
import React from 'react';

import sales from '../../ontology/sales';
import { tableCellTopology } from '../../../../topologies';

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
