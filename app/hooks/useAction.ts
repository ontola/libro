import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  useDataFetching,
  useResourceProperty,
} from 'link-redux';

const useAction = (resource: SomeNode, predicate: NamedNode): [action: NamedNode, status: NamedNode] => {
  const [action] = useResourceProperty(resource, predicate) as NamedNode[];
  useDataFetching(action);
  const [actionStatus] = useResourceProperty(action, schema.actionStatus) as NamedNode[];

  return [action, actionStatus];
};

export default useAction;
