import { NamedNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import { SomeNode } from 'link-lib';
import { LaxNode, useGlobalIds } from 'link-redux';
import React from 'react';

import { inputValueFromStorage } from '../../../Common/lib/persistence';
import { formContext } from '../../../Form/components/Form/FormContext';
import form from '../../../Form/ontology/form';

type FlowActiveField = [
  activeField: LaxNode,
  setActiveField: (index: number) => void,
  currentIndex: number,
];

const findInitialIndex = (
  sessionStore: Storage | undefined,
  object: LaxNode,
  formID: string | undefined,
  fieldPaths: NamedNode[][],
): number => {
  if (!formID) {
    return 0;
  }

  for (let i = fieldPaths.length - 1; i >= 0; i--) {
    const path = fieldPaths[i][0];

    if (path && !!inputValueFromStorage(sessionStore, path, object, formID, false)) {
      return i + 1;
    }
  }

  return 0;
};

export const useFlowActiveField = (fields: SomeNode[]): FlowActiveField => {
  const {
    formID,
    object,
    sessionStore,
  } = React.useContext(formContext);

  const [activeField, setActiveField] = React.useState<LaxNode>(undefined);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const activateIndex = React.useCallback((nextIndex: number) => {
    if (nextIndex === fields.length) {
      setActiveField(form.ns('Flow/SubmissionScreen'));
    } else {
      setActiveField(fields[nextIndex]);
    }
  }, [fields, setActiveField]);

  const fieldPaths = useGlobalIds(fields, sh.path);

  React.useEffect(() => {
    if (activeField === undefined) {
      const initialIndex = findInitialIndex(sessionStore, object, formID, fieldPaths);
      activateIndex(initialIndex);

      return;
    }

    if (activeField.value === form.ns('Flow/SubmissionScreen').value) {
      setCurrentIndex(fields.length);

      return;
    }

    const index = fields.findIndex((field) => field === activeField);
    setCurrentIndex(index < 0 ? fields.length : index);
  }, [activeField]);

  return [activeField, activateIndex, currentIndex];
};
