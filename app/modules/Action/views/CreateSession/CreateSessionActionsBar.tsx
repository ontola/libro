import { register } from 'link-redux';
import React from 'react';

import { SignInFormLink } from '../../../Auth/components/SignInForm';
import Button from '../../../Common/components/Button';
import ontola from '../../../Kernel/ontology/ontola';
import { actionsBarTopology } from '../../topologies';

const CreateSessionActionsBar = () => (
  <SignInFormLink Component={Button} />
);

CreateSessionActionsBar.type = ontola.ns('Create::Auth::Session');

CreateSessionActionsBar.topology = actionsBarTopology;

export default register(CreateSessionActionsBar);
