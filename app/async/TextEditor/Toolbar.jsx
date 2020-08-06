import { Paper, makeStyles } from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import { seqToArray } from '@rdfdev/collections';
import {
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

import { Divider } from './toolbar/Divider';
import { StyleSelector } from './toolbar/StyleSelector';
import { ToggleButton } from './toolbar/ToggleButton';

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

const MenuItem = ({ item, marks }) => {
  useDataInvalidation(item.subject);

  if (item.subject === editor.divider) {
    return <Divider />;
  } else if (item.subject === editor.paragraphStyleSelector) {
    // return <StyleSelector item={item} />;
    return <span/>;
  }

  return <ToggleButton item={item} marks={marks} />;
};

const useToolbar = () => {
  const lrs = useLRS();
  const textEditor = useSlate();
  const [{ toolbar }] = useResourceLinks(editor.localSettings, settingsPropMap);
  const toolbarResources = seqToArray(lrs.store, toolbar);
  const toolbarItems = useResourceLinks(toolbarResources, propMap, { forceRender: true });
  console.log('useToolbar', toolbarResources, toolbarItems);

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
