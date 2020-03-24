import { Paper, makeStyles } from '@material-ui/core';
import MaterialSelect from '@material-ui/core/Select';
import MaterialMenuItem from '@material-ui/core/MenuItem';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import rdf, { isNamedNode } from '@ontologies/core';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import { seqToArray } from '@rdfdev/collections';
import {
  Property,
  Resource,
  useDataInvalidation,
  useLRS,
  useResourceLinks,
} from 'link-redux';
import React from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';

import ontola from '../../ontology/ontola';
import editor from '../../ontology/ontola/editor';
import ActionsBar from '../../topologies/ActionsBar';
import Select from '../../topologies/Select';
import Selected from '../../topologies/Selected';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3),
  },
  root: {
    padding: 0,
  },
  toolbar: {
    color: 'rgba(0,0,0,.7)',
    display: 'inherit',
    padding: theme.spacing(0),
  },
}));

const settingsPropMap = {
  toolbar: editor.toolbar,
};

const propMap = {
  action: ontola.action,
  current: editor.current,
  in: sh.in,
  mark: editor.mark,
  menuItems: ontola.menuItems,
  name: [schema.name, rdfs.label],
};

const useMenuItemStyles = makeStyles(({
  button: {
    border: 'none',
    height: 48,
  },
  root: {
    backgroundColor: 'transparent',
  },
}));

const useDividerStyles = makeStyles((theme) => ({
  divider: {
    borderLeft: '1px solid #dadce0',
    margin: theme.spacing(3, 1),
    userSelect: 'none',
  },
}));


const Divider = () => {
  const { divider } = useDividerStyles();

  return <div className={divider} />;
};

function normalizeAction(lrs, action, opts) {
  if (isNamedNode(action)) {
    return (e) => {
      e.preventDefault();

      return lrs.exec(action, opts);
    };
  }

  return action;
}

function MenuItem({ item, marks }) {
  const classes = useMenuItemStyles();
  const lrs = useLRS();
  useDataInvalidation({ subject: item });
  const textEditor = useSlate();
  const actionOpts = { item, textEditor };

  if (item.subject === editor.divider) {
    return <Divider />;
  } else if (item.in) {
    const items = seqToArray(lrs, item.in);

    return (
      <Select elementType={React.Fragment}>
        <MaterialSelect
          classes={classes}
          className={classes.root}

          MenuProps={{
            anchorOrigin: {
              horizontal: 'left',
              vertical: 'bottom',
            },
            getContentAnchorEl: null,
          }}
          renderValue={(value) => (value
            ? <Selected><Resource subject={value} /></Selected>
            : 'Nothing selected'
          )}
          value={item.current}
          onChange={(e) => normalizeAction(
            lrs,
            lrs.getResourceProperty(e.target.value, ontola.action),
            actionOpts
          )(e)}
        >
          {items.map((i) => (
            <MaterialMenuItem key={i} value={i}>
              <Resource subject={i} />
            </MaterialMenuItem>
          ))}
        </MaterialSelect>
      </Select>
    );
  }

  return (
    <ToggleButton
      className={classes.button}
      selected={marks.includes(rdf.toNQ(item.mark))}
      title={item.name.value}
      value={rdf.toNQ(item.mark)}
      onClick={normalizeAction(lrs, item.action, actionOpts)}
    >
      <Resource subject={item.subject}>
        <Property label={schema.image} />
      </Resource>
    </ToggleButton>
  );
}

const useToolbar = () => {
  const lrs = useLRS();
  const textEditor = useSlate();
  const [{ toolbar }] = useResourceLinks(editor.localSettings, settingsPropMap);
  const toolbarResources = seqToArray(lrs.store, toolbar);
  const toolbarItems = useResourceLinks(toolbarResources, propMap, { forceRender: true });

  if (!Array.isArray(toolbarItems)) {
    return () => null;
  }
  const marksArr = Object.keys(Editor.marks(textEditor) || {});

  return (
    <ToggleButtonGroup
      size="small"
      value={marksArr}
    >
      {toolbarItems.map((item) => (
        <MenuItem
          item={item}
          key={item.subject}
          marks={marksArr}
        />
      ))}
    </ToggleButtonGroup>
  );
};

const Toolbar = () => {
  const styles = useStyles();
  const toolbar = useToolbar();

  return (
    <Paper
      className={`${styles.toolbar} ${styles.borderCollapse}`}
      elevation={0}
    >
      <ActionsBar>
        {toolbar}
      </ActionsBar>
    </Paper>
  );
};

export default Toolbar;
