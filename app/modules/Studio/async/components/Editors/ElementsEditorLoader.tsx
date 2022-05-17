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
  console.log(slice);
  const documents = findRecordsOfType(slice, elements.Document);
  console.log(documents);

  if (documents.length === 0) {
    return (
      <p>
        No elements:Document present
      </p>
    );
  }

  // TODO
  return (
    <ErrorBoundary>
      <ElementsLoader
        placeholder="test"
        value={documents[0]}
        onChange={(...args) => console.log(...args)}
      />
    </ErrorBoundary>
  );
};
