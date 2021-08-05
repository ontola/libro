import { isNamedNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import { SomeNode } from 'link-lib';
import { LaxNode, useLRS } from 'link-redux';
import React from 'react';

import { FormContext } from '../../../components/Form/Form';
import { inputValueFromStorage } from '../../../hooks/useInitialValues';

type FlowActiveField = [activeField: LaxNode, setActiveField: (field: LaxNode) => void, currentIndex: number];

const useFlowActiveField = (fields: SomeNode[], loading: boolean): FlowActiveField => {
  const lrs = useLRS();
  const {
    formID,
    object,
    sessionStore,
  } = React.useContext(FormContext);

  const [activeField, setActiveField] = React.useState<LaxNode>(fields[0]);
  const currentIndex = fields.findIndex((field) => field === activeField);

  React.useEffect(() => {
    if (!loading) {
      const reversed = fields.slice().reverse();
      const lastTouchedIndex = reversed.findIndex((field) => {
        const path = lrs.getResourceProperty(field, sh.path);

        if (!isNamedNode(path) || !formID) {
          return false;
        }

        return !!inputValueFromStorage(sessionStore, path, object, formID, false);
      });
      const initialIndex = lastTouchedIndex === -1 ? 0 : (fields.length - lastTouchedIndex);
      const initialField = fields[initialIndex];

      if (initialField !== activeField) {
        setActiveField(initialField);
      }
    }
  }, [loading]);

  return [activeField, setActiveField, currentIndex === -1 ? fields.length : currentIndex];
};

export default useFlowActiveField;
