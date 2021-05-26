import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { WebManifest } from '../../appContext';
import ErrorBoundary from '../../components/ErrorBoundary';
import { handle } from '../../helpers/logging';

import {
  PageBuilderContext,
  builderContext,
  editorStateContext,
} from './builderContext';
import { EditorEvents, EditorUpdateEvent } from './Communicator';
import Editor from './Editor';
import { PageViewerProps } from './PageViewer';
import { Tabbar } from './Tabbar';
import Toolbar from './Toolbar';

const EDITOR_UPDATE_FREQ = 300;

interface PopoutEditorProps {
  onClose: () => void;
}

const usePopoutViewer = ({ onClose }: PopoutEditorProps) => {
  const [docSetter, setDocSetter] = React.useState<(doc: PageViewerProps) => void>(() => undefined);
  const [_, setDialog] = React.useState<Window | undefined>();
  const [manifest, setManifest] = React.useState<Partial<WebManifest>>({});
  const { source, resources, files } = React.useContext(builderContext);
  const { resourceIndex } = React.useContext(editorStateContext);
  const sendUpdate = React.useCallback(() => {
    if (docSetter) {
      docSetter({
        currentResource: resourceIndex === -1 ? 'auto' : resources[resourceIndex]?.value,
        doc: {
          manifestOverride: '{}',
          source: source ?? '',
        },
        manifest,
      });
    }
  }, [source, docSetter, resources, resourceIndex, manifest]);

  const [delayedUpdate] = useDebouncedCallback(sendUpdate, EDITOR_UPDATE_FREQ);

  React.useEffect(() => {
    try {
      const manifestFile = files.find((f) => f.name === 'manifest.json')!;
      const next = JSON.parse(manifestFile.value);
      setManifest(next);
    } catch (e) {
      handle(e);
    }
  }, [files]);

  React.useEffect(() => {
    const dialog = window.open('/d/builder/viewer', '', 'width=800,height=600,left=200,top=200');

    if (!dialog) {
      throw new Error("Couldn't open dialog");
    }
    setDialog(dialog);

    const next = (opts: PageViewerProps) => {
      const update: EditorUpdateEvent = {
        type: EditorEvents.EditorUpdate,
        viewOpts: opts,
      };

      dialog.postMessage(update, '*');
    };
    setDocSetter(() => next);

    return () => {
      try {
        dialog.postMessage({ type: EditorEvents.EditorClose }, '*');
        dialog?.close();
      } finally {
        onClose();
      }
    };
  }, []);

  React.useEffect(() => {
    delayedUpdate();
  }, [source, docSetter, resources, resourceIndex, manifest]);
};

const useStyles = makeStyles((theme) => ({
  container: {
    height: 'calc(100vh - 3.2rem)',
    overflow: 'hidden',
  },
  editor: {
    height: '100%',
    overflow: 'scroll',
  },
  resizer: {
    '&:hover': {
      opacity: 1,
    },
    background: '#000',
    backgroundClip: 'padding-box',
    boxSizing: 'border-box',
    cursor: 'ew-resize',
    flexShrink: 0,
    opacity: '.5',
    width: '.4rem',
    zIndex: 1,
  },
  viewer: {
    height: 'calc(100vh - 3.2rem)',
    overflow: 'scroll',
  },
  windowOverlay: {
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: theme.zIndex.appBar + 1,
  },
}));

const PageBuilder = (): JSX.Element => {
  const classes = useStyles();
  const [open, setOpened] = React.useState(true);
  usePopoutViewer({
    onClose: () => setOpened(false),
  });

  return (
    <div className={classes.windowOverlay}>
      <Toolbar />
      <Tabbar />
      {!open && (
        <div>Window closed</div>
      )}
      <Grid
        container
        className={classes.container}
        direction="row"
      >
        <Paper className={classes.editor}>
          <ErrorBoundary>
            <Editor />
          </ErrorBoundary>
        </Paper>
      </Grid>
    </div>
  );
};

export const PageBuilderWithContext = (): JSX.Element => (
  <PageBuilderContext>
    <PageBuilder />
  </PageBuilderContext>
);

export default PageBuilderWithContext;
