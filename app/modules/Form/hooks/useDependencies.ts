import {
  BlankNode,
  NamedNode,
  isNamedNode, 
} from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  LaxNode,
  useDataFetching,
  useLRS,
} from 'link-redux';
import React from 'react';

import { entityIsLoaded } from '../../Kernel/lib/data';

import { getDependencies } from './useInitialValues/getDependencies';

export type InitialValues = [
  loading: boolean | NamedNode | BlankNode | undefined,
  dependencies: SomeNode[],
];

const EMPTY_STATE: InitialValues = [false, []];

export const useDependencies = (
  sessionStore: Storage | undefined,
  actionBody: LaxNode,
  object: SomeNode | undefined,
  formID: string,
): InitialValues => {
  const lrs = useLRS();
  const [loading, setLoading] = React.useState<boolean | SomeNode | undefined>(true);
  const [dependencies, setDependencies] = React.useState<SomeNode[]>([]);

  const timestamp = useDataFetching(dependencies);

  React.useEffect(() => {
    if (!actionBody || !object) {
      return;
    }

    const newDependencies = getDependencies(lrs, sessionStore, actionBody, object, formID, false);

    const currentLoading = newDependencies.filter(isNamedNode).find((resource) => (
      !entityIsLoaded(lrs, resource)
    ));

    if (!currentLoading) {
      setLoading(false);
    }

    setDependencies(newDependencies);
  }, [actionBody, object, formID, timestamp]);

  if (!actionBody || !object) {
    return EMPTY_STATE;
  }

  return [loading, dependencies];
};
