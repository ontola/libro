import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { SomeNode } from 'link-lib';
import RDFIndex from 'link-lib/dist-types/store/RDFIndex';
import { RenderStoreProvider, Resource } from 'link-redux';
import React from 'react';
import { useDebounce } from 'use-debounce';

import ErrorBoundary from '../../components/ErrorBoundary';
import generateLRS from '../../helpers/generateLRS';
import useStoredState from '../../hooks/useStoredState';
import { Page } from '../../topologies/Page';
import register from '../../views';

import defaultSource from './defaultSource';
import parseToGraph from './parseToGraph';

const BUFFERED_TEXT_DEBOUNCE_DELAY = 300;

const useStyles = makeStyles({
  editor: {
    height: '90vh',
    overflow: 'scroll',
  },
  splitPane: {
    height: '90vh',
    overflow: 'hidden',
  },
  toolbar: {
    marginBottom: '1em',
    padding: '.5em',
    width: '100%',
  },
  viewer: {
    height: '90vh',
    overflow: 'scroll',
  },
});

const PageBuilder = (): JSX.Element => {
  const classes = useStyles();
  const [lrs, setLRS] = React.useState(() => generateLRS());
  const [index, setIndex] = React.useState<number>(0);
  const [resources, setResources] = React.useState<SomeNode[]>(
    () => [lrs.lrs.store.getInternalStore().quads[0].subject],
  );
  const currentResource = resources[index];
  const [text, setText] = useStoredState('libro.pagebuilder.value', defaultSource);

  const [bufferedText] = useDebounce(text, BUFFERED_TEXT_DEBOUNCE_DELAY, { leading: true });

  React.useEffect(() => {
    try {
      const graphs = parseToGraph(bufferedText ?? '');
      const nextResources = graphs.flatMap(([subject]) => subject);
      const data = graphs.flatMap(([_, rdfIndex]) => (rdfIndex as RDFIndex).quads);
      const next = generateLRS(data);
      register(next.lrs);

      setResources(nextResources);
      setLRS(next);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.debug(e);
    }
  }, [text, bufferedText]);

  return (
    <Grid
      container
      direction="row"
    >
      <RenderStoreProvider value={lrs.lrs}>
        <Paper className={classes.toolbar} elevation={3}>
          <FormControl>
            <InputLabel htmlFor="pagebuilder-resource">Resource</InputLabel>
            <Select
              labelId="pagebuilder-resource"
              value={index}
              onChange={(e) => setIndex(Number(e.target.value))}
            >
              {resources.map((resource, i) => (
                <MenuItem key={resource.value} value={i}>{resource.value}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
        <Grid
          container
          className={classes.splitPane}
          direction="row"
          spacing={1}
        >
          <Grid item direction="column" xs={3}>
            <Paper className={classes.editor}>
              <TextField
                fullWidth
                multiline
                defaultValue={text}
                value={text}
                variant="outlined"
                onChange={(e) => setText(e.target.value)}
              />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Grid container className={classes.viewer} direction="column">
              <ErrorBoundary key={currentResource.value}>
                <Page>
                  <Resource subject={currentResource} />
                </Page>
              </ErrorBoundary>
            </Grid>
          </Grid>
        </Grid>
      </RenderStoreProvider>
    </Grid>
  );
};

export default PageBuilder;
