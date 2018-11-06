import { FILTER } from '../../../../components/Omniform';
import { allow } from '../../../../helpers/data';
import { NS } from '../../../../helpers/LinkedRenderStore';

export const filterActions = potentialAction => allow(potentialAction, FILTER);

export const invalidStatuses = [NS.argu('DisabledActionStatus'), NS.argu('ExpiredActionStatus')];

export const actionsAreAllDisabled = (items, lrs) => {
  const actionStatuses = items.map(a => lrs.getResourceProperty(a, NS.schema('actionStatus')));

  return actionStatuses.every(a => invalidStatuses.includes(a));
};
