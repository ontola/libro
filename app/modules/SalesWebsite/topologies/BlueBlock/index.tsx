import { Container as MaterialContainer } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { ContainerProps, maxWidth } from '../../../Common/topologies/Container';
import { LibroTheme, Size } from '../../../Kernel/lib/themes';
import { TopologyFC } from '../../../Kernel/lib/topology';
import { blueBlockTopology } from '../index';

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
