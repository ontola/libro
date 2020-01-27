import { LinkedRenderStore, RENDER_CLASS_NAME } from 'link-lib';
import { Type } from 'link-redux';
import React from 'react';

import { AccountHelpersCardAppendix } from '../../components/SignInForm/SignInFormHelpers';
import ontola from '../../ontology/ontola';
import { alertDialogTopology } from '../../topologies/Dialog';

export default [
  LinkedRenderStore.registerRenderer(
    () => <Type appendix={AccountHelpersCardAppendix} />,
    [
      ontola.ns('Create::Users::Password'),
      ontola.ns('Create::Users::Confirmation'),
      ontola.ns('Create::Users::Unlock'),
    ],
    RENDER_CLASS_NAME,
    alertDialogTopology
  ),
];
