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

import { entityIsLoaded } from '../../../Kernel/lib/data';

import { addDependencies } from './addDependencies';

export type DependencyQuery = [
  loading: boolean | NamedNode | BlankNode | undefined,
  dependencies: SomeNode[],
];

const EMPTY_STATE: DependencyQuery = [false, []];

export const useDependencies = (
  sessionStore: Storage | undefined,
  actionBody: LaxNode,
  object: SomeNode | undefined,
  formID: string,
): DependencyQuery => {
  const lrs = useLRS();
  const [loading, setLoading] = React.useState<boolean | SomeNode | undefined>(true);
  const [dependencies, setDependencies] = React.useState<SomeNode[]>([]);

  const timestamp = useDataFetching(dependencies);

  React.useEffect(() => {
    if (!actionBody || !object) {
      return;
    }

    const dependentResources = new Set<SomeNode>();

    addDependencies(dependentResources, lrs, sessionStore, actionBody, [object], formID, false);

    const newDependencies = [...dependentResources];
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
