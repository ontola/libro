import { Container as MaterialContainer } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useTopologyProvider } from 'link-redux';

import { LibroTheme, Size } from '../../../themes/themes';
import { blueBlockTopology } from '../../../topologies';
import { ContainerProps, maxWidth } from '../../Container';
import { TopologyFC } from '../../Topology';

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
