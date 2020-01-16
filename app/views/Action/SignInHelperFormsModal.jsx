import { LinkedRenderStore, RENDER_CLASS_NAME } from 'link-lib';
import { Type } from 'link-redux';
import React from 'react';

import { AccountHelpersCardAppendix } from '../../components/SignInForm/SignInFormHelpers';
import ontola from '../../ontology/ontola';
import { alertDialogTopology } from '../../topologies/Dialog';
import PrimaryResource from '../../topologies/PrimaryResource';

export default [
  LinkedRenderStore.registerRenderer(
    () => (
      <PrimaryResource>
        <Type appendix={AccountHelpersCardAppendix} />
      </PrimaryResource>
    ),
    [
      ontola.ns('Create::Users::Password'),
      ontola.ns('Create::Users::Confirmation'),
      ontola.ns('Create::Users::Unlock'),
    ],
    RENDER_CLASS_NAME,
    alertDialogTopology
  ),
];
