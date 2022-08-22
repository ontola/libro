import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useProperty, 
} from 'link-redux';
import React from 'react';

import { ButtonVariant } from '../../Common/components/Button';
import { listTopology } from '../../Common/topologies';
import { isInvalidActionStatus } from '../hooks/useValidActions';
import { actionsBarTopology } from '../topologies';

import { CardListOnClick } from './helpers';

interface InlineCreateActionProps {
  count: Literal;
  onClick: CardListOnClick;
  variant: ButtonVariant;
}

const ActionInline: FC<InlineCreateActionProps> = ({
  variant,
}) => {
  const [actionStatus] = useProperty(schema.actionStatus);

  if (isInvalidActionStatus(actionStatus)) {
    return null;
  }

  return (
    <Property
      modal
      label={schema.target}
      variant={variant}
    />
  );
};

ActionInline.type = schema.Action;

ActionInline.topology = [
  actionsBarTopology,
  listTopology,
];

export default register(ActionInline);
