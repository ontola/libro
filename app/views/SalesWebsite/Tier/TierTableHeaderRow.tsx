import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useStrings,
} from 'link-redux';
import React from 'react';

import sales from '../../../ontology/sales';
import { tableHeaderRowTopology } from '../../../topologies';

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
