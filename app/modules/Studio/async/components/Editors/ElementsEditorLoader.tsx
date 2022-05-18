import { MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import React from 'react';

import ErrorBoundary from '../../../../../components/ErrorBoundary';
import elements from '../../../../../ontology/elements';
import ElementsLoader from '../../../../Elements/components/ElementsLoader';
import { DeepSlice, dataObjectsToDeepSlice } from '../../../lib/dataObjectsToDeepSlice';
import { evaluate } from '../../../lib/evaluate';
import { findRecordsOfType } from '../../../lib/findRecordsOfType';
import { ProjectContextProps } from '../../context/ProjectContext';
import { deepSliceToSource } from '../../lib/deepSliceToSource';
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
  onChange,
}: DataEditorProps): JSX.Element => {
  const source = evaluate(value, project.websiteIRI);
  const slice = dataObjectsToDeepSlice(source);
  const documents = findRecordsOfType(slice, elements.Document);
  const [docIndex, setDocIndex] = React.useState(0);

  React.useEffect(() => {
    setDocIndex(0);
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
          value={docIndex}
          onChange={(e) => setDocIndex(Number(e.target.value))}
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
        value={documents[docIndex]}
        onChange={(deepRecord) => {
          const docId = documents[docIndex]._id;
          const updatedSlice: DeepSlice = {
            ...slice,
            [docId.value]: deepRecord,
          };
          console.log(updatedSlice);

          if (onChange) {
            const newSource = deepSliceToSource(updatedSlice, project.websiteIRI);
            console.log('newSource', newSource);
            onChange(newSource);
          }
        }}
      />
    </ErrorBoundary>
  );
};
