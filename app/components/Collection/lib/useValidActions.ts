import { isNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import { useResourceLinks } from 'link-redux';

export const useValidActions = (actions: SomeNode[]): SomeNode[] => {
  const actionStatuses = useResourceLinks(actions, { status: schema.actionStatus });

  return actionStatuses
    .filter(({ status }) => status === schema.PotentialActionStatus)
    .map(({ subject }) => subject)
    .filter(isNode);
};

