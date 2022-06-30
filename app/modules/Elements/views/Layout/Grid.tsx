import { makeStyles } from '@mui/styles';
import {
  FC,
  Property,
  register,
  useStrings,
} from 'link-redux';
import React from 'react';

import { LibroTheme, Margin } from '../../../../themes/themes';
import { allTopologies } from '../../../../topologies';
import elements from '../../ontology/elements';

import { marginMap } from './layout';

interface StyleProps {
  minWidth: string;
  gap: Margin;
}

const DEFAULT_MIN_WIDTH = '250px';

const useStyles = makeStyles<LibroTheme, StyleProps>((theme) => ({
  grid: {
    display: 'grid',
    gap: ({ gap }) => theme.spacing(gap),
    gridTemplateColumns: ({ minWidth }) => `repeat(auto-fit, minmax(${minWidth}, 1fr))`,
    justifyItems: 'stretch',
  },
}));

const ElementsGrid: FC = () => {
  const [minWidth] = useStrings(elements.minWidth);
  const [gap] = useStrings(elements.gap);

  const classes = useStyles({
    gap: marginMap.get(gap) ?? Margin.Medium,
    minWidth: minWidth || DEFAULT_MIN_WIDTH,
  });

  return (
    <div className={classes.grid}>
      <Property label={elements.children} />
    </div>
  );
};

ElementsGrid.type = elements.Grid;
ElementsGrid.topology = allTopologies;

export default register(ElementsGrid);
