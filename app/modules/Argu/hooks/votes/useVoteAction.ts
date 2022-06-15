import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  LaxNode,
  useDataFetching,
  useIds,
  useLRS,
  useStrings,
} from 'link-redux';

import ontola from '../../../../ontology/ontola';
import { entityIsLoaded } from '../../../Core/lib/data';
import { LRS, SubmitDataProcessor } from '../../../Common/lib/errorHandling';

interface UseVoteAction {
  action: LaxNode;
  expired: boolean;
  tooltip?: string;
  target: LaxNode;
}

const useVoteAction = (createAction: SomeNode, active: boolean, currentVote: SomeNode): UseVoteAction => {
  const lrs = useLRS<unknown, SubmitDataProcessor>();
  const [deleteVoteAction] = useIds(active ? currentVote : undefined, ontola.trashAction);
  const action = active && entityIsLoaded<LRS>(lrs, deleteVoteAction)
    ? deleteVoteAction
    : createAction;
  useDataFetching([createAction, deleteVoteAction]);
  const [actionStatus] = useIds(action, schema.actionStatus);
  const [target] = useIds(action, schema.target);
  const [error] = useStrings(action, schema.error);
  const disabled = rdf.equals(actionStatus, ontola.DisabledActionStatus);
  const completed = rdf.equals(actionStatus, schema.CompletedActionStatus);
  const expired = rdf.equals(actionStatus, ontola.ExpiredActionStatus);

  return {
    action,
    expired,
    target: (disabled || completed) ? undefined : target,
    tooltip: error,
  };
};

export default useVoteAction;
