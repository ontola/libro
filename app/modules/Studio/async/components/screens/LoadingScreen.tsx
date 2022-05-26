import { Grow, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import rdf from '@ontologies/core';
import React from 'react';

import { WebManifest } from '../../../../Kernel/components/AppContext/WebManifest';
import { empJsonId } from '../../../../Kernel/lib/empjsonSerializer';
import {
  ProjectAction,
  ProjectContextProps,
  ServerData,
} from '../../context/ProjectContext';

export interface LoadingScreenProps extends ProjectContextProps {
  show: boolean;
}

const DOTSTOP = 4;
const DOT_INTERVAL = 700;

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
  },
});

const newManifest = {
  ontola: {
    primary_color: '#475668',
    secondary_color: '#d96833',
    theme: 'common',
    website_iri: 'https://changeme.localdev',
  },
};

const newDocument: ServerData = {
  data: {
    '/': {
      _id: empJsonId(rdf.namedNode('/')),
    },
  },
  manifest: newManifest as WebManifest,
  // pages: [],
  sitemap: '',
};

export const LoadingScreen = ({ dispatch, project, show }: LoadingScreenProps): JSX.Element => {
  const classes = useStyles();

  const [dots, setDots] = React.useState('');

  React.useEffect(() => {
    if (project.iri === undefined) {
      return;
    }

    if (project.iri === '') {
      dispatch({
        data: newDocument,
        type: ProjectAction.Finished,
      });

      return;
    }

    fetch(project.iri, { headers: { Accept: 'application/json' } })
      .then((res) => res.json())
      .then((data: ServerData) => {
        dispatch({
          data,
          type: ProjectAction.Finished,
        });

        dispatch({
          type: ProjectAction.HashProjectData,
        });
      });
  }, [project.iri]);

  React.useEffect(() => {
    if (!show) {
      return;
    }

    const i = window.setInterval(() => {
      setDots((prev) => Array((prev.length + 1) % DOTSTOP).fill('.').join(''));
    }, DOT_INTERVAL);

    return () => window.clearInterval(i);
  }, [show]);

  return (
    <Grow in={show}>
      <div className={classes.root}>
        <Typography variant="h2">
          Loading
          {dots.padEnd(DOTSTOP - 1, '\xa0')}
        </Typography>
      </div>
    </Grow>
  );
};
