import { Container as MaterialContainer } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { ContainerProps, maxWidth } from '../../../Common/topologies/Container';
import { LibroTheme, Size } from '../../../Kernel/lib/themes';
import { blueBlockTopology } from '../index';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  root: {
    background: theme.palette.primary.main,
    padding: 30,
  },
}));

const BlueBlockTopology = createTopologyProvider(blueBlockTopology);

const BlueBlock: TopologyFC<ContainerProps> = ({ children, ...props }) => {
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
