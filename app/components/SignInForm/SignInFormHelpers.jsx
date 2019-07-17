import { FormattedMessage } from 'react-intl';
import React from 'react';

import UnorderedList from '../UnorderedList';
import Link from '../Link';
import path from '../../helpers/paths';
import {
  CardAppendix,
  CardContent,
  CardRow,
} from '../../topologies/Card';


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

export const AccountHelpersCardAppendix = () => (
  <CardAppendix>
    <CardRow backdrop>
      <CardContent endSpacing>
        <AccountHelpers />
      </CardContent>
    </CardRow>
  </CardAppendix>
);
