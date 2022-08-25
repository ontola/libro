import { TabContext, TabPanel } from '@mui/lab';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { makeStyles } from '@mui/styles';
import { DeepRecord } from 'link-lib';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { handle } from '../../../../../helpers/logging';
import elements from '../../../../Elements/ontology/elements';
import { findNestedRecordsOfType } from '../../../lib/findRecordsOfType';
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
import { toValue } from '../../lib/graphToSeed';
import { ResourceType } from '../../lib/types';

import { DataEditor } from './DataEditor';
import { ElementsEditorWrapper } from './ElementsEditorWrapper';

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
  const documents = findNestedRecordsOfType(resource, toValue(elements.Document));

  const [tab, setTab] = React.useState('editor');
  const [value, setValue] = React.useState(() => resource
    ? deepSeedRecordToSource(resource, project.websiteIRI)
    : '({})');

  const reloadValueFromStore = React.useCallback(() => {
    setValue(resource
      ? deepSeedRecordToSource(resource, project.websiteIRI)
      : '({})');
  }, [resource, project.websiteIRI]);

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
    setTab('editor');

    if (resource) {
      const deepRecord = deepSeedRecordToDeepRecord(
        resource,
        project.websiteIRI,
        window.EMP_SYMBOL_MAP,
      );
      setValue(deepRecordToSource(deepRecord, project.websiteIRI));
    }
  }, [project.selected.origin, project.selected.path]);

  const handleElementsUpdate = React.useCallback((path: string[]) => (record: DeepRecord | undefined) => {
    if (resource && record) {
      dispatch({
        path: [resource._id.v, ...path],
        record: deepRecordToDeepSeed(record),
        type: ProjectAction.UpdateNestedRecord,
      });
    }
  }, [resource?._id?.v]);

  return (
    <TabContext value={tab}>
      <Tabs
        className={classes.tabs}
        value={tab}
        onChange={(_: unknown, newValue: string) => {
          if (tab === 'editor') {
            reloadValueFromStore();
          }

          setTab(newValue);
        }}
      >
        <Tab
          label="Editor"
          value="editor"
        />
        {documents.map((document) => (
          <Tab
            key={document[0]._id.v}
            label={`Elements (${document[0]._id.v})`}
            value={document[0]._id.v}
          />
        ))}
      </Tabs>
      <TabPanel
        className={classes.grow}
        value="editor"
      >
        <DataEditor
          id={project.selected.origin + project.selected.path}
          reloadValue={reloadValueFromStore}
          resourceType={ResourceType.RDF}
          value={value}
          onChange={(v) => {
            setValue(v!);
            scheduleSave(v!);
          }}
          onMount={onMount}
        />
      </TabPanel>
      {documents.map((document) => (
        <TabPanel
          className={classes.grow}
          key={document[0]._id.v}
          value={document[0]._id.v}
        >
          <ElementsEditorWrapper
            record={document[0]}
            websiteIRI={project.websiteIRI}
            onChange={handleElementsUpdate(document[1])}
            onMount={onMount}
          />
        </TabPanel>
      ))}
    </TabContext>
  );
};
