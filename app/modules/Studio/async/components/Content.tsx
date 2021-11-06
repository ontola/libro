import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

import {
  ProjectContextProps,
  ResourceType,
  currentComponent,
} from '../context/ProjectContext';
import { useMonacoWithBundle } from '../hooks/useMonacoWithBundle';

import { CodeEditor } from './Editors/CodeEditor';
import { SiteMapEditor } from './Editors/SiteMapEditor';
import { SubResourceEditor } from './Editors/SubResourceEditor';

const EDITOR_SKELETON_HEIGHT = 25;

const useStyles = makeStyles({
  container: {
    flexFlow: 'initial',
  },
  grow: {
    flexGrow: 1,
  },
  root: {
    height: '100vh',
    transform: 'scale(0.8, 1)',
  },
});

export interface EditorProps extends ProjectContextProps {
  onMount?: () => void;
}

export const Content = ({ project, dispatch, onMount }: EditorProps): JSX.Element => {
  const classes = useStyles();
  const initialized = useMonacoWithBundle();

  const resource = currentComponent(project);

  if (!initialized) {
    return (
      <Grid
        container
        className={classes.container}
        direction="row"
      >
        <Grid
          item
          xs={1}
        >
          <Skeleton
            animation="wave"
            classes={classes}
          />
        </Grid>
        <Grid
          item
          className={classes.grow}
          xs={10}
        >
          {Array(EDITOR_SKELETON_HEIGHT).fill(undefined).map((_, i) => (
            <Skeleton
              animation="wave"
              key={i}
            />
          ))}
        </Grid>
      </Grid>
    );
  }

  if (!resource) {
    return (
      <div>
        File not found
      </div>
    );
  }

  if (resource.type === ResourceType.RDF && project.subResource !== -1) {
    return (
      <SubResourceEditor
        dispatch={dispatch}
        project={project}
        onMount={onMount}
      />
    );
  }

  if (resource.type === ResourceType.Manifest || resource.type === ResourceType.RDF) {
    return (
      <CodeEditor
        dispatch={dispatch}
        project={project}
        onMount={onMount}
      />
    );
  }

  if (resource.type === ResourceType.SiteMap) {
    return <SiteMapEditor project={project} />;
  }

  if (resource.type === ResourceType.Elements) {
    return (
      <div>
        RTE
      </div>
    );
  }

  if (resource.type === ResourceType.MediaObject) {
    return (
      <div>
        Media Object Uploader
      </div>
    );
  }

  return (
    <div>
      Unknown type
    </div>
  );
};
