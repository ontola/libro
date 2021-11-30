import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import { useDataFetching, useGlobalIds } from 'link-redux';

const useActionStatus = (resource: SomeNode, predicate: NamedNode): [action: NamedNode, status: NamedNode] => {
  const [action] = useGlobalIds(resource, predicate);
  useDataFetching(action);
  const [actionStatus] = useGlobalIds(action, schema.actionStatus);

  return [action, actionStatus];
};

export default useActionStatus;
