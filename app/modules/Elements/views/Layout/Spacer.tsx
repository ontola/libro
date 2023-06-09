import { makeStyles } from '@mui/styles';
import {
  FC,
  register,
  useNumbers,
} from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';
import { allTopologies } from '../../../../topologies';
import elements from '../../ontology/elements';

interface StyleProps {
  gap: number;
}

const useStyles = makeStyles<LibroTheme, StyleProps>((theme) => ({
  spacer: {
    height: ({ gap }) => theme.spacing(gap),
  },
}));

const Spacer: FC = () => {
  const [gap] = useNumbers(elements.gap);
  const classes = useStyles({ gap });

  return (
    <div className={classes.spacer} />
  );
};

Spacer.type = elements.Spacer;
Spacer.topology = allTopologies;

export default register(Spacer);
