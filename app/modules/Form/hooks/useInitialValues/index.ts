import {
  BlankNode,
  NamedNode, 
} from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  LaxNode,
  useLRS,
} from 'link-redux';
import React from 'react';

import { getInitialValues } from './getInitialValues';

export type InitialValues = Record<string, unknown> | undefined;

const EMPTY_STATE: InitialValues = {};

const useInitialValues = (
  loading: boolean | NamedNode | BlankNode | undefined,
  sessionStore: Storage | undefined,
  actionBody: LaxNode,
  object: SomeNode | undefined,
  formID: string,
): InitialValues => {
  const lrs = useLRS();
  const [initialValues, setInitialValues] = React.useState({});

  React.useEffect(() => {
    if (!actionBody || !object || loading) {
      return;
    }

    const currentValues = getInitialValues(lrs, sessionStore, actionBody, object, formID, false);
    setInitialValues(currentValues);
  }, [actionBody, object, formID]);

  if (!actionBody || !object) {
    return EMPTY_STATE;
  }

  return initialValues as Record<string, unknown>;
};

export default useInitialValues;
