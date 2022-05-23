import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeItem, TreeView } from '@mui/lab';
import {
  Button,
  Grid,
  Menu,
  MenuItem,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import {
  ProjectAction,
  ProjectContextProps,
} from '../../context/ProjectContext';
import { Path, sliceToWebsiteTree } from '../../lib/sliceToWebsiteTree';

const useListItemStyles = makeStyles({
  label: {
    fontSize: '.8rem !important',
  },
});

const useStyles = makeStyles({
  listItem: {
    paddingBottom: '.1em',
    paddingTop: '.1em',
  },
  resourceList: {
    flexGrow: 1,
    height: '87vh',
    maxWidth: '17em !important',
    overflowX: 'hidden',
  },
  treeView: {
    display: 'initial',
  },
});

export const ResourcePanel = ({ dispatch, project }: ProjectContextProps): JSX.Element => {
  const classes = useStyles();
  const listItemClasses = useListItemStyles();
  const [contextMenu, setContextMenu] = React.useState<{
    id: string,
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const addRecord = React.useCallback(() => {
    const name = window.prompt('Enter page path') ?? 'new';

    dispatch({
      path: project.subResource + `/${name}`,
      type: ProjectAction.AddResource,
    });
    setContextMenu(null);
  }, [dispatch, project.subResource]);

  const deleteRecord = React.useCallback(() => {
    dispatch({
      type: ProjectAction.DeleteResource,
    });
    setContextMenu(null);
  }, [dispatch]);

  const renameRecord = React.useCallback(() => {
    const path = window.prompt('Enter resource path', project.subResource);

    if (path) {
      dispatch({
        path,
        type: ProjectAction.RenameResource,
      });
    }

    setContextMenu(null);
  }, [dispatch, project]);

  const selectResource = React.useCallback((_: unknown, id: string) => {
    dispatch({
      id: id.slice(id.indexOf('.') + 1),
      type: ProjectAction.SetResource,
    });
  }, [dispatch]);

  const handleContextMenu = React.useCallback((event: React.MouseEvent, id: string) => {
    event.preventDefault();

    if (contextMenu !== null) {
      // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
      // Other native context menus might behave different.
      // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
      setContextMenu(null);
    } else {
      setContextMenu({
        id,
        mouseX: event.clientX + 2,
        mouseY: event.clientY - 6,
      });
    }
  }, []);

  const renderTree = (origin: string, path: Path, depth = 0): JSX.Element => (
    <TreeItem
      classes={listItemClasses}
      icon={path.icon && <FontAwesome name={path.icon} />}
      key={origin + path.path}
      label={path.segment}
      nodeId={`${depth}.${path.path}`}
      onContextMenu={(e) => handleContextMenu(e, path.path)}
    >
      {Object
        .values(path.children)
        .map((node) => renderTree(origin, node, depth + 1))}
    </TreeItem>
  );

  return (
    <Grid
      container
      direction="column"
    >
      <Grid
        item
        className={classes.resourceList}
      >
        <TreeView
          className={classes.treeView}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          defaultExpanded={['*']}
          defaultSelected="/"
          sx={{
            flexGrow: 1,
            height: 110,
            maxWidth: 400,
            overflowY: 'auto',
          }}
          onNodeSelect={selectResource}
        >
          {Object.entries(sliceToWebsiteTree(project.data))
            .map(([origin, path], i) => renderTree(origin, path, 1000 * i))}
        </TreeView>
        <Menu
          anchorPosition={contextMenu !== null
            ? {
              left: contextMenu.mouseX,
              top: contextMenu.mouseY,
            }
            : undefined}
          anchorReference="anchorPosition"
          open={contextMenu !== null}
          onClose={() => setContextMenu(null)}
        >
          <MenuItem onClick={addRecord}>
            Add
          </MenuItem>
          <MenuItem onClick={renameRecord}>
            Edit
          </MenuItem>
          <MenuItem onClick={deleteRecord}>
            Delete
          </MenuItem>
        </Menu>
      </Grid>
      <Grid item>
        <Button onClick={addRecord}>
          Add
        </Button>
        <Button onClick={deleteRecord}>
          Delete
        </Button>
      </Grid>
    </Grid>
  );
};
