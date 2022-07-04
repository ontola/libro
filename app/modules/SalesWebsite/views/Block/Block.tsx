import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  register,
  useIds,
  useStrings,
} from 'link-redux';
import React from 'react';

import { LibroTheme, Margin } from '../../../Kernel/lib/themes';
import { allTopologiesExcept } from '../../../../topologies';
import Container from '../../../Common/topologies/Container';
import sales from '../../ontology/sales';
import { showcaseTopology } from '../../topologies/Showcase';

interface StyleProps {
  color: string;
}

const useStyles = makeStyles<LibroTheme, StyleProps>((theme) => ({
  block: {
    '& h2': {
      marginTop: 'unset',
    },
    backgroundColor: ({ color }) => color,
    padding: theme.spacing(Margin.XL),
  },
}));

const Block: FC = () => {
  const [text] = useIds(schema.text);
  const [color] = useStrings(schema.color);
  const classes = useStyles({ color });

  return (
    <div className={classes.block}>
      <Container>
        <Resource subject={text} />
      </Container>
    </div>
  );
};

Block.type = sales.Block;
Block.topology = allTopologiesExcept(showcaseTopology);

export default register(Block);
