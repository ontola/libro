import { TabContext, TabPanel } from '@mui/lab';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { handle } from '../../../../../helpers/logging';
import { sourceToDeepSlice } from '../../../lib/sourceToDeepSlice';
import {
  ProjectAction,
  ProjectContextProps,
  selectedRecord,
} from '../../context/ProjectContext';
import { compactDeepSeedDataRecord } from '../../lib/compactDeepSeed';
import { deepRecordToDeepSeed } from '../../lib/deepRecordToDeepSeed';
import { deepSeedRecordToDeepRecord } from '../../lib/deepSeedRecordToDeepRecord';
import { deepRecordToSource, deepSeedRecordToSource } from '../../lib/deepSliceToSource';
import { ResourceType } from '../../lib/types';

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
  const resource = selectedRecord(project);

  const [tab, setTab] = React.useState('editor');
  const [value, setValue] = React.useState(() => resource
    ? deepSeedRecordToSource(resource, project.websiteIRI)
    : '({})');

  const [scheduleSave, , flushSave] = useDebouncedCallback<(v: string) => void>((next) => {
    try {
      const slice = sourceToDeepSlice(next, project.websiteIRI);
      const record = deepRecordToDeepSeed(Object.values(slice)[0]);
      const compacted = compactDeepSeedDataRecord(record, project.websiteIRI);

      dispatch({
        id: resource?._id?.v ?? '/',
        record: compacted,
        type: ProjectAction.UpdateRDFSubResource,
      });
    } catch (e) {
      handle(e);
    }
  }, EDITOR_TIMEOUT);

  React.useEffect(() => {
    flushSave();

    if (resource) {
      const deepRecord = deepSeedRecordToDeepRecord(resource, project.websiteIRI, window.EMP_SYMBOL_MAP);
      setValue(deepRecordToSource(deepRecord, project.websiteIRI));
    }
  }, [project.selected.origin, project.selected.path]);

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
          id={project.selected.origin + project.selected.path}
          resourceType={ResourceType.RDF}
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
