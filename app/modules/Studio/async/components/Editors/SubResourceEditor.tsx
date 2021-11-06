import { AppBar } from '@material-ui/core';
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
import { PrerenderPreview } from '../PrerenderPreview';

import { DataEditor } from './DataEditor';

interface CodeEditorProps extends ProjectContextProps {
  onMount?: () => void;
}

const useStyles = makeStyles({
  grow: {
    height: '100%',
  },
});

const EDITOR_TIMEOUT = 300;

export const SubResourceEditor = ({ project, dispatch, onMount }: CodeEditorProps): JSX.Element => {
  const classes = useStyles();
  const resource = subResource(project);

  const [tab, setTab] = React.useState('editor');
  const [value, setValue] = React.useState(() => resource.value);

  const [scheduleSave,, flushSave] = useDebouncedCallback<(v: string) => void>((next) => {
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
      <AppBar position="static">
        <Tabs
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
            label="Preview"
            value="preview"
          />
        </Tabs>
      </AppBar>
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
        value="preview"
      >
        <PrerenderPreview project={project} />
      </TabPanel>
    </TabContext>
  );
};
