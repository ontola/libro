import * as schema from '@ontologies/schema';
import { useIds, useStrings } from 'link-redux';
import React from 'react';

import ontola from '../../../ontology/ontola';
import ActionButton from '../../Action/components/ActionButton';
import { useEnabledActions } from '../../Action/hooks/useEnabledActions';
import { useOmniformOpenAction } from '../lib/hooks';

const OmniformTrigger = (): JSX.Element | null => {
  const [isPartOf] = useIds(schema.isPartOf);
  const [createAction] = useEnabledActions(useIds(ontola.createAction));
  const [name] = useStrings(createAction, schema.name);
  const onClick = useOmniformOpenAction(isPartOf, createAction);

  if (!createAction) {
    return null;
  }

  return (
    <ActionButton
      name={name}
      onClick={onClick}
    />
  );
};

export default OmniformTrigger;
