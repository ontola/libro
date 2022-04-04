import { register } from 'link-redux';
import React from 'react';

import Button from '../../../components/Button';
import { SignInFormLink } from '../../../components/SignInForm';
import ontola from '../../../ontology/ontola';
import { actionsBarTopology } from '../../../topologies';

const CreateSessionActionsBar = () => (
  <SignInFormLink Component={Button} />
);

CreateSessionActionsBar.type = ontola.ns('Create::Auth::Session');

CreateSessionActionsBar.topology = actionsBarTopology;

export default register(CreateSessionActionsBar);
