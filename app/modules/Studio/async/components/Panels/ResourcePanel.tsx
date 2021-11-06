import {
  Button,
  Grid,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/styles';
import { termStr } from '@rdfdev/iri';
import React from 'react';

import {
  ProjectAction,
  ProjectContextProps,
  SubResource,
} from '../../context/ProjectContext';

const useStyles = makeStyles({
  listItem: {
    paddingBottom: '.1em',
    paddingTop: '.1em',
  },
  resourceList: {
    flexGrow: 1,
    maxWidth: '20em',
  },
});

const displayName = (resource: SubResource) => {
  if (!resource.path) {
    return '';
  }

  return resource.path === '/' ? 'Website root' : termStr(resource.path);
};

export const ResourcePanel = ({ dispatch, project }: ProjectContextProps): JSX.Element => {
  const classes = useStyles();

  const addResource = React.useCallback(() => {
    dispatch({
      type: ProjectAction.AddResource,
    });
  }, [dispatch]);

  const deleteResource = React.useCallback(() => {
    dispatch({
      type: ProjectAction.DeleteResource,
    });
  }, [dispatch]);

  const selectResource = React.useCallback((id: number) => {
    dispatch({
      id,
      type: ProjectAction.SetResource,
    });
  }, [dispatch]);

  return (
    <Grid
      container
      direction="column"
    >
      <Grid
        item
        className={classes.resourceList}
      >
        <List>
          {project.website.children.map((resource, i) => (
            <ListItem
              button
              className={classes.listItem}
              key={i}
              selected={project.subResource === i}
              onClick={() => selectResource(i)}
            >
              <ListItemText>
                {i}
                {' '}
                {displayName(resource)}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item>
        <Button onClick={addResource}>
          Add
        </Button>
        <Button onClick={deleteResource}>
          Delete
        </Button>
      </Grid>
    </Grid>
  );
};
