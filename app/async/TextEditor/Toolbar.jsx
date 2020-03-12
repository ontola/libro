import { Paper, makeStyles } from '@material-ui/core';
import MaterialMenuItem from '@material-ui/core/MenuItem';
import MaterialSelect from '@material-ui/core/Select';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { isNamedNode } from '@ontologies/core';
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
import { ReactEditor, useEditor } from 'slate-react';

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
  marksIRI: editor.marks,
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

function normalizeAction(lrs, action, textEditor) {
  if (isNamedNode(action)) {
    return (e) => {
      e.preventDefault();

      return lrs.exec(action, true)
        .then((r) => {
          ReactEditor.focus(textEditor);

          return r;
        });
    };
  }

  return action;
}

function MenuItem({ item }) {
  console.log('MenuItem', item);
  const classes = useMenuItemStyles();
  const lrs = useLRS();
  const textEditor = useEditor();

  if (item.subject === editor.divider) {
    return <Divider />;
  } else if (item.in) {
    const items = seqToArray(lrs, item.in);

    return (
      <MaterialSelect
        classes={classes}
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
        value={items[0]}
      >
        <Select>
          <Resource subject={item.in} />
        </Select>
      </MaterialSelect>
    );
  }

  return (
    <ToggleButton
      className={classes.button}
      title={item.name.value}
      value={item.mark}
      onClick={normalizeAction(lrs, item.action, textEditor)}
    >
      <Resource subject={item.subject}>
        <Property label={schema.image} />
      </Resource>
    </ToggleButton>
  );
}

const useToolbar = () => {
  const lrs = useLRS();
  const textEditor = useEditor();
  const [{ marksIRI, toolbar }] = useResourceLinks(editor.localSettings, settingsPropMap);
  const t = useDataInvalidation({ dataSubjects: [editor.localSettings, marksIRI, toolbar] });
  const marks = React.useMemo(() => seqToArray(lrs.store, marksIRI), [marksIRI, t]);
  const toolbarResources = seqToArray(lrs.store, toolbar);
  const toolbarItems = useResourceLinks(toolbarResources, propMap, { forceRender: true });

  React.useEffect(() => {
    Object.keys(textEditor.marks || {}).map((m) => textEditor.removeMark(m));
    marks.forEach((m) => textEditor.addMark(m, true));
    // eslint-disable-next-line no-param-reassign
    textEditor.marks = marks.reduce((acc, entry) => {
      acc[entry] = true;

      return acc;
    }, {});
  }, [marks]);

  if (!Array.isArray(toolbarItems)) {
    return () => null;
  }

  return (
    <ToggleButtonGroup
      size="small"
      value={marks}
    >
      {toolbarItems.map((item) => (
        <MenuItem
          item={item}
          key={item.subject}
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
