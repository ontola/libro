import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { ProjectContext, useProjectStateReducer } from '../context/ProjectContext';

import { NoProjectScreen } from './screens/NoProjectScreen';
import { ProjectScreen } from './screens/ProjectScreen';
import { LoadingScreen } from './screens/LoadingScreen';

const useStyles = makeStyles((theme) => ({
  windowOverlay: {
    background: 'white',
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: theme.zIndex.appBar + 1,
  },
}));

const screen = (project: ProjectContext): [React.FC<any> | undefined, boolean] => {
  if (project.iri === undefined) {
    return [NoProjectScreen, false];
  } else if (project.loading) {
    return [undefined, true];
  }

  return [ProjectScreen, false];
};

export const StudioFrame = (): JSX.Element => {
  const classes = useStyles();
  const [project, dispatch] = useProjectStateReducer();

  const [Screen, loading] = screen(project);

  return  (
    <div className={classes.windowOverlay}>
      {Screen && (
        <Screen
          dispatch={dispatch}
          project={project}
        />
      )}
      <LoadingScreen
        dispatch={dispatch}
        project={project}
        show={loading}
      />
    </div>
  );
};
