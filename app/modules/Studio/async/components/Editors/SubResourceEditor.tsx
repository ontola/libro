import { TabContext, TabPanel } from '@mui/lab';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { makeStyles } from '@mui/styles';
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
    </TabContext>
  );
};
