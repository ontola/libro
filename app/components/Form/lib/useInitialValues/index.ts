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

import { entityIsLoaded } from '../../../../helpers/data';

import { getDependencies } from './getDependencies';
import { getInitialValues } from './getInitialValues';

const useInitialValues = (
  sessionStore: Storage | undefined,
  actionBody: LaxNode,
  object: SomeNode | undefined,
  formID: string,
): [boolean | NamedNode | BlankNode | undefined,  Record<string, unknown> | undefined] => {
  const lrs = useLRS();
  const [timestamp, setTimestamp] = React.useState<null | number>(null);
  const [loading, setLoading] = React.useState<boolean | SomeNode | undefined>(true);
  const [initialValues, setInitialValues] = React.useState({});
  const [dependencies, setDependencies] = React.useState<NamedNode[]>([]);

  React.useEffect(() => {
    if (!actionBody || !object) {
      return;
    }

    if (!loading) {
      return;
    }

    const newDependencies = getDependencies(lrs, sessionStore, actionBody, object, formID, false);
    const currentValues = getInitialValues(lrs, sessionStore, actionBody, object, formID, false);

    const currentLoading = newDependencies.filter(isNamedNode).find((resource) => (
      !entityIsLoaded(lrs, resource)
    ));

    if (!currentLoading) {
      setInitialValues(currentValues);
      setLoading(false);
    }

    setDependencies(newDependencies.filter(isNamedNode));
  }, [actionBody, object, formID, timestamp]);
  const currentTimestamp = useDataFetching(dependencies);

  if (currentTimestamp !== timestamp) {
    setTimestamp(currentTimestamp);
  }

  if (!actionBody || !object) {
    return [false, {}];
  }

  return [loading, initialValues as Record<string, unknown>];
};

export default useInitialValues;
