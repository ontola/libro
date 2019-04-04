import { LinkedRenderStore, RENDER_CLASS_NAME } from 'link-lib';
import { Type } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Link from '../../components/Link';
import UnorderedList from '../../components/UnorderedList';
import { NS } from '../../helpers/LinkedRenderStore';
import path from '../../helpers/paths';
import Container from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import PrimaryResource from '../../topologies/PrimaryResource';

export const AccountHelpers = () => (
  <UnorderedList>
    <li>
      <Link target="modal" to={path.newPassword()}>
        <FormattedMessage
          defaultMessage="Forgot password?"
          id="https://app.argu.co/i18n/forms/session/forgotLink/label"
        />
      </Link>
    </li>
    <li>
      <Link target="modal" to={path.confirmation()}>
        <FormattedMessage
          defaultMessage="Resend confirmation link?"
          id="https://app.argu.co/i18n/forms/session/confirmationLink/label"
        />
      </Link>
    </li>
    <li>
      <Link target="modal" to={path.newUnlock()}>
        <FormattedMessage
          defaultMessage="Account locked?"
          id="https://app.argu.co/i18n/forms/session/accountLocked/label"
        />
      </Link>
    </li>
    <li>
      <Link target="modal" to={path.signIn()}>
        <FormattedMessage
          defaultMessage="Sign in or register"
          id="https://app.argu.co/i18n/forms/session/signinregister/label"
        />
      </Link>
    </li>
  </UnorderedList>
);

export default [
  LinkedRenderStore.registerRenderer(
    () => (
      <PrimaryResource>
        <Type />
        <Container>
          <AccountHelpers />
        </Container>
      </PrimaryResource>
    ),
    [
      NS.argu('Create::Users::Password'),
      NS.argu('Create::Users::Confirmation'),
      NS.argu('Create::Users::Unlock'),
    ],
    RENDER_CLASS_NAME,
    alertDialogTopology
  ),
];
