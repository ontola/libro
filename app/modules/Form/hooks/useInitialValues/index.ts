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

import { InputValue } from '../../components/FormField/FormFieldTypes';

import { getInitialValues } from './getInitialValues';

export type InitialValues = Record<string, InputValue[]>;

const EMPTY_STATE: InitialValues = {};

const useInitialValues = (
  loading: boolean | NamedNode | BlankNode | undefined,
  sessionStore: Storage | undefined,
  actionBody: LaxNode,
  object: SomeNode | undefined,
  formID: string,
  submitCount: number,
): InitialValues | undefined => {
  const lrs = useLRS();

  return React.useMemo(() => {
    if (loading) {
      return undefined;
    }

    if (!actionBody || !object) {
      return EMPTY_STATE;
    }

    const currentValues = getInitialValues(lrs, sessionStore, actionBody, object, formID, false);

    return currentValues;
  }, [actionBody, object, formID, loading, submitCount]);
};

export default useInitialValues;
