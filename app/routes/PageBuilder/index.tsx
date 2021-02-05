import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { SomeNode } from 'link-lib';
import RDFIndex from 'link-lib/dist-types/store/RDFIndex';
import { RenderStoreProvider, Resource } from 'link-redux';
import React from 'react';
import { useDebounce } from 'use-debounce';

import generateLRS from '../../helpers/generateLRS';
import useStoredState from '../../hooks/useStoredState';
import { Page } from '../../topologies/Page';
import register from '../../views';

import defaultSource from './defaultSource';
import parseToGraph from './parseToGraph';

const PageBuilder = () => {
  const [lrs, setLRS] = React.useState(() => generateLRS());
  const [resource, setResource] = React.useState<SomeNode>(() => lrs.lrs.store.getInternalStore().quads[0].subject);
  const [text, setText] = useStoredState('libro.pagebuilder.value', defaultSource);

  const [bufferedText] = useDebounce(text, 300, { leading: true });

  React.useEffect(() => {
    try {
      const [nextResource, parsed] = parseToGraph(bufferedText ?? '');
      const next = generateLRS((parsed as RDFIndex).quads);
      register(next.lrs);

      setResource(nextResource);
      setLRS(next);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.debug(e);
    }
  }, [bufferedText]);

  return (
    <RenderStoreProvider value={lrs.lrs}>
      <Grid container spacing={1}>
        <Grid item xs={3} direction="column">
          <Paper>
            <TextField
              multiline
              fullWidth
              defaultValue={text}
              value={text}
              variant="outlined"
              onChange={(e) => setText(e.target.value)}
            />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Page>
            <Resource subject={resource} />
          </Page>
        </Grid>
      </Grid>
    </RenderStoreProvider>
  );
};

export default PageBuilder;
