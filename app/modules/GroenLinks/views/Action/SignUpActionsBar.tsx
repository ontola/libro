import { useTheme } from '@mui/material';
import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { isInvalidActionStatus } from '../../../Action/hooks/useEnabledActions';
import { actionsBarTopology } from '../../../Action/topologies';
import { ButtonVariant } from '../../../Common/components/Button';
import ontola from '../../../Kernel/ontology/ontola';
import teamGL from '../../ontology/teamGL';

const SignUpActionsBar = () => {
  const theme = useTheme();
  const [actionStatus] = useProperty(schema.actionStatus);

  if (actionStatus === schema.CompletedActionStatus) {
    return (
      <div className="Button">
        Je hebt je aangemeld voor deze actie!
      </div>
    );
  }

  if (actionStatus === ontola.ExpiredActionStatus) {
    return (
      <div className="Button">
        Deze actie zit al vol.
      </div>
    );
  }

  if (isInvalidActionStatus(actionStatus)) {
    return null;
  }

  return (
    <Property
      modal
      color={theme.palette.primary.main}
      label={schema.target}
      variant={ButtonVariant.Toggle}
    />
  );
};

SignUpActionsBar.type = teamGL.SignUpAction;

SignUpActionsBar.topology = actionsBarTopology;

export default register(SignUpActionsBar);
