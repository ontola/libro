import { makeStyles } from '@mui/styles';
import {
  FC,
  Property,
  register,
  useStrings,
} from 'link-redux';
import React from 'react';

import { LibroTheme, Margin } from '../../../Common/theme/types';
import { allTopologies } from '../../../../topologies';
import elements from '../../ontology/elements';

import { marginMap } from './layout';

interface StyleProps {
  alignment: string;
  gap: Margin;
}

const useStyles = makeStyles<LibroTheme, StyleProps>((theme) => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ({ gap }) => theme.spacing(gap),
    justifyContent: ({ alignment }) => alignment,
  },
}));

const Row: FC = () => {
  const [gap] = useStrings(elements.gap);
  const [alignment] = useStrings(elements.align);

  const classes = useStyles({
    alignment: alignment ?? 'start',
    gap: marginMap.get(gap) ?? Margin.Medium,
  });

  return (
    <div className={classes.row}>
      <Property label={elements.children} />
    </div>
  );
};

Row.type = elements.Row;
Row.topology = allTopologies;

export default register(Row);
