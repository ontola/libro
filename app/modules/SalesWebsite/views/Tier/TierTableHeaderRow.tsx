import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useStrings,
} from 'link-redux';
import React from 'react';

import { tableHeaderRowTopology } from '../../../Table/topologies';
import sales from '../../ontology/sales';

interface StyleProps {
  color: string;
}

const useStyles = makeStyles<void, StyleProps>({
  title: {
    color: ({ color }) => color,
  },
});

const TierTableHeaderRow: FC = () => {
  const [name] = useStrings(schema.name);
  const [color] = useStrings(schema.color);

  const classes = useStyles({ color });

  return (
    <span className={classes.title}>
      {name}
    </span>
  );
};

TierTableHeaderRow.type = sales.Tier;
TierTableHeaderRow.topology = tableHeaderRowTopology;

export default register(TierTableHeaderRow);
