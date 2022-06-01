import { createStyles, makeStyles } from '@mui/styles';
import { Container as MUIContainer } from '@mui/material';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../themes/themes';
import { mainBodyTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

const useStyles = makeStyles((theme: LibroTheme) => createStyles({
  paper: {
    backgroundColor: theme.palette.background.paper,
  },
  wrapper: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: '2rem',
    paddingTop: '1rem',
  },
}));

const MainBody: TopologyFC = ({ children }) => {
  const [MainBodyTopology] = useTopologyProvider(mainBodyTopology);
  const classes = useStyles();

  return (
    <MainBodyTopology>
      <div className={classes.wrapper}>
        <MUIContainer
          className={classes.paper}
          maxWidth="xl"
        >
          {children ?? ''}
        </MUIContainer>
      </div>
    </MainBodyTopology>
  );
};

export default MainBody;
