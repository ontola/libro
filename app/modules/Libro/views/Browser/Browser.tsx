import rdf from '@ontologies/core';
import { AppBar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  Resource,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';
import { useLocation } from 'react-router';

import { allTopologies } from '../../../../topologies';
import { Navigate } from '../../../Common/middleware/actions';
import { LibroTheme } from '../../../Kernel/lib/themes';
import libro from '../../../Kernel/ontology/libro';
import { Toolbar } from '../../components/Toolbar';
import Page from '../../../Common/topologies/Page';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  appBar: {
    position: 'fixed',
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  main: {
    display: 'block',
    marginTop: '3.5em',
    position: 'relative',
    width: '100%',
  },
  root: {
    display: 'flex',
  },
}));

const Browser = () => {
  const classes = useStyles();
  const lrs = useLRS();
  const location = useLocation();
  const hash = location.hash.slice(1);
  const iri = hash ? decodeURIComponent(hash) : null;

  const [id, setId] = React.useState(rdf.namedNode(iri || 'https://localhost/home'));

  React.useEffect(() => {
    const next = rdf.namedNode(`https://localhost/browser#${encodeURIComponent(id.value)}`);
    lrs.actions.get(Navigate)(next);
  }, [id]);

  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appBar}
        position="static"
      >
        <Toolbar
          initial={id.value}
          setId={setId}
        />
      </AppBar>

      <main className={classes.main}>
        <Page>
          <Resource subject={id} />
        </Page>
      </main>
    </div>
  );
};

Browser.type = libro.bootstrap.Browser;

Browser.topology = allTopologies;

export default register(Browser);
