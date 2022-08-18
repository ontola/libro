import { Container as MUIContainer } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';
import { mainBodyTopology } from '../index';

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

const MainBodyTopology = createTopologyProvider(mainBodyTopology);

const MainBody: TopologyFC = ({ children }) => {
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
