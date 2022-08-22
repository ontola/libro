import * as schema from '@ontologies/schema';
import { useIds, useStrings } from 'link-redux';
import React from 'react';

import ActionButton from '../../Action/components/ActionButton';
import { useValidActions } from '../../Action/hooks/useValidActions';
import ontola from '../../Kernel/ontology/ontola';
import { useOmniformOpenAction } from '../lib/hooks';

const OmniformTrigger = (): JSX.Element | null => {
  const [isPartOf] = useIds(schema.isPartOf);
  const [createAction] = useValidActions(useIds(ontola.createAction));
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
