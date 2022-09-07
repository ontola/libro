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
  objectDependencies: SomeNode[],
  formDependencies: SomeNode[],
];

const EMPTY_STATE: DependencyQuery = [false, [], []];

export const useDependencies = (
  sessionStore: Storage | undefined,
  actionBody: LaxNode,
  object: SomeNode | undefined,
  formID: string,
): DependencyQuery => {
  const lrs = useLRS();
  const [loading, setLoading] = React.useState<boolean | SomeNode | undefined>(true);
  const [resolvedObjectDependencies, setObjectDependencies] = React.useState<SomeNode[]>([]);
  const [resolvedFormDependencies, setFormDependencies] = React.useState<SomeNode[]>([]);

  const timestamp = useDataFetching([...resolvedObjectDependencies, ...resolvedFormDependencies]);

  React.useEffect(() => {
    if (!actionBody || !object) {
      return;
    }

    const objectResources = new Set<SomeNode>();
    const formResources = new Set<SomeNode>();

    addDependencies(objectResources, formResources, lrs, sessionStore, actionBody, [object], formID, false);

    const currentLoading = [...objectResources, ...formResources].filter(isNamedNode).find((resource) => (
      !entityIsLoaded(lrs, resource)
    ));

    if (!currentLoading) {
      setLoading(false);
    }

    setObjectDependencies([...objectResources]);
    setFormDependencies([...formResources]);
  }, [actionBody, object, formID, timestamp]);

  if (!actionBody || !object) {
    return EMPTY_STATE;
  }

  if (!loading) {
    resolvedObjectDependencies.map((v) => {
      console.log(`${v.value}: ${entityIsLoaded(lrs, v)}`);
    });
  }

  return [loading, resolvedObjectDependencies, resolvedFormDependencies];
};
