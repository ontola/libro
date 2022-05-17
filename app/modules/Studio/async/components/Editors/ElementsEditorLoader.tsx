import { MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import React from 'react';

import ErrorBoundary from '../../../../../components/ErrorBoundary';
import elements from '../../../../../ontology/elements';
import ElementsLoader from '../../../../Elements/components/ElementsLoader';
import { dataObjectsToDeepSlice } from '../../../lib/dataObjectsToDeepSlice';
import { evaluate } from '../../../lib/evaluate';
import { findRecordsOfType } from '../../../lib/findRecordsOfType';
import { ProjectContextProps } from '../../context/ProjectContext';
import { Editable } from '../../lib/types';

interface DataEditorProps extends ProjectContextProps {
  onChange?: (v: string | undefined) => void;
  resource: Editable;
  onMount?: () => void;
  value: string;
}

export const ElementsEditorLoader = ({
  project,
  value,
}: DataEditorProps): JSX.Element => {
  const source = evaluate(value, project.websiteIRI);
  const slice = dataObjectsToDeepSlice(source);
  const documents = findRecordsOfType(slice, elements.Document);
  const [docId, setDocId] = React.useState(0);

  React.useEffect(() => {
    setDocId(0);
  }, [documents.length, project.current, project.subResource]);

  if (documents.length === 0) {
    return (
      <p>
        No elements:Document present
      </p>
    );
  }

  return (
    <ErrorBoundary>
      {documents.length > 1 && (
        <Select
          id="demo-simple-select"
          labelId="demo-simple-select-label"
          value={docId}
          onChange={(e) => setDocId(Number(e.target.value))}
        >
          {documents.map((doc, i) => (
            <MenuItem
              key={doc._id.value}
              value={i}
            >
              {doc._id.value}
            </MenuItem>
          ))}
        </Select>
      )}
      <ElementsLoader
        placeholder="test"
        value={documents[docId]}
        onChange={(...args) => console.log(...args)}
      />
    </ErrorBoundary>
  );
};
