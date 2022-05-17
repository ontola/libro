import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { TabContext, TabPanel } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { handle } from '../../../../../helpers/logging';
import {
  ProjectAction,
  ProjectContextProps,
  subResource,
} from '../../context/ProjectContext';
import { parseSource } from '../../hooks/useGenerateLRSFromSource';
import { websiteRelativePath } from '../../lib/iri';

import { DataEditor } from './DataEditor';
import { ElementsEditorLoader } from './ElementsEditorLoader';

interface CodeEditorProps extends ProjectContextProps {
  onMount?: () => void;
}

const useStyles = makeStyles({
  grow: {
    height: '100%',
  },
  tabs: {
    backgroundColor: '#fbfbfb',
    position: 'static',
  },
});

const EDITOR_TIMEOUT = 300;

export const SubResourceEditor = ({ project, dispatch, onMount }: CodeEditorProps): JSX.Element => {
  const classes = useStyles();
  const resource = subResource(project);

  const [tab, setTab] = React.useState('editor');
  const [value, setValue] = React.useState(() => resource.value);

  const [scheduleSave, , flushSave] = useDebouncedCallback<(v: string) => void>((next) => {
    try {
      const [[iri]] = parseSource(next, project.websiteIRI);

      dispatch({
        data: {
          path: websiteRelativePath(iri.value, project.websiteIRI),
          value: next,
        },
        id: resource.id,
        type: ProjectAction.UpdateRDFSubResource,
      });
    } catch (e) {
      handle(e);
    }
  }, EDITOR_TIMEOUT);

  React.useEffect(() => {
    flushSave();
    setValue(resource.value);
  }, [resource]);

  return (
    <TabContext value={tab}>
      <Tabs
        className={classes.tabs}
        value={tab}
        onChange={(_: unknown, newValue: string) => {
          setTab(newValue);
        }}
      >
        <Tab
          label="Editor"
          value="editor"
        />
        <Tab
          label="Elements"
          value="elements"
        />
      </Tabs>
      <TabPanel
        className={classes.grow}
        value="editor"
      >
        <DataEditor
          resource={resource}
          value={value}
          onChange={(v) => {
            setValue(v!);
            scheduleSave(v!);
          }}
          onMount={onMount}
        />
      </TabPanel>
      <TabPanel
        className={classes.grow}
        value="elements"
      >
        <ElementsEditorLoader
          dispatch={dispatch}
          project={project}
          resource={resource}
          value={value}
          onChange={(v) => {
            setValue(v!);
            scheduleSave(v!);
          }}
          onMount={onMount}
        />
      </TabPanel>
    </TabContext>
  );
};
