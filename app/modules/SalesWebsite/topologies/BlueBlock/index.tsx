import { Container as MaterialContainer } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { LibroTheme, Size } from '../../../Common/theme/types';
import { ContainerProps, maxWidth } from '../../../Common/topologies/Container';
import { TopologyFC } from '../../../Core/lib/topology';
import sales from '../../ontology/sales';

export const blueBlockTopology = sales.topologies.blueBlock;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  root: {
    background: theme.palette.primary.main,
    padding: 30,
  },
}));

const BlueBlock: TopologyFC<ContainerProps> = ({ children, ...props }) => {
  const [BlueBlockTopology] = useTopologyProvider(blueBlockTopology);
  const classes = useStyles();
  const {
    size,
    ...containerProps
  } = props;

  return (
    <BlueBlockTopology>
      <div className={classes.root}>
        <MaterialContainer
          maxWidth={maxWidth(size ?? Size.Medium)}
          {...containerProps}
        >
          {children}
        </MaterialContainer>
      </div>
    </BlueBlockTopology>
  );
};

export default BlueBlock;
