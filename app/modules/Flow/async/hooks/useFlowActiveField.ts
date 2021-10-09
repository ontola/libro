import { NamedNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import { SomeNode } from 'link-lib';
import {
  LaxNode,
  useGlobalIds,
} from 'link-redux';
import React from 'react';

import { FormContext } from '../../../../components/Form/Form';
import { inputValueFromStorage } from '../../../../hooks/useInitialValues';

type FlowActiveField = [activeField: LaxNode, setActiveField: (field: LaxNode) => void, currentIndex: number];

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

export const useFlowActiveField = (fields: SomeNode[], loading: boolean): FlowActiveField => {
  const {
    formID,
    object,
    sessionStore,
  } = React.useContext(FormContext);

  const [activeField, setActiveField] = React.useState<LaxNode>(fields[0]);

  const fieldPaths = useGlobalIds(fields, sh.path);

  const currentIndex = fields.findIndex((field) => field === activeField);

  React.useEffect(() => {
    if (!loading) {
      const initialIndex = findInitialIndex(sessionStore, object, formID, fieldPaths);
      const initialField = fields[initialIndex];

      if (initialField !== activeField) {
        setActiveField(initialField);
      }
    }
  }, [loading]);

  return [activeField, setActiveField, currentIndex === -1 ? fields.length : currentIndex];
};
