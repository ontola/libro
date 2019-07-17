import { LinkedRenderStore, RENDER_CLASS_NAME } from 'link-lib';
import { Type } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { alertDialogTopology } from '../../topologies/Dialog';
import PrimaryResource from '../../topologies/PrimaryResource';
import { AccountHelpersCardAppendix } from '../../components/SignInForm/SignInFormHelpers';

export default [
  LinkedRenderStore.registerRenderer(
    () => (
      <PrimaryResource>
        <Type appendix={AccountHelpersCardAppendix} />
      </PrimaryResource>
    ),
    [
      NS.ontola('Create::Users::Password'),
      NS.ontola('Create::Users::Confirmation'),
      NS.ontola('Create::Users::Unlock'),
    ],
    RENDER_CLASS_NAME,
    alertDialogTopology
  ),
];
