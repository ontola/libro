import * as schema from '@ontologies/schema';
import { useIds, useStrings } from 'link-redux';
import React from 'react';

import ontola from '../../../ontology/ontola';
import ActionButton from '../../Action/components/ActionButton';
import { useOmniformOpenAction } from '../lib/hooks';

const OmniformTrigger = (): JSX.Element => {
  const [isPartOf] = useIds(schema.isPartOf);
  const [createAction] = useIds(ontola.createAction);
  const [name] = useStrings(createAction, schema.name);
  const onClick = useOmniformOpenAction(isPartOf, createAction);

  return (
    <ActionButton
      name={name}
      onClick={onClick}
    />
  );
};

export default OmniformTrigger;
