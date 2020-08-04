import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
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

const AccountHelper = ({
  isActive,
  defaultMessage,
  id,
  onClick,
  to,
}) => (
  <li>
    <Link isActive={isActive} to={to} onClick={onClick}>
      <FormattedMessage
        defaultMessage={defaultMessage}
        id={id}
      />
    </Link>
  </li>
);

AccountHelper.propTypes = {
  defaultMessage: PropTypes.string,
  id: PropTypes.string,
  isActive: PropTypes.func,
  onClick: PropTypes.func,
  to: PropTypes.string,
};

const AccountHelpers = ({ isActive, onClick }) => (
  <UnorderedList>
    <AccountHelper
      defaultMessage="Sign in or register"
      id="https://app.argu.co/i18n/forms/session/signinregister/label"
      isActive={isActive}
      to={path.signIn()}
      onClick={onClick}
    />
    <AccountHelper
      defaultMessage="Forgot password?"
      id="https://app.argu.co/i18n/forms/session/forgotLink/label"
      isActive={isActive}
      to={path.newPassword()}
      onClick={onClick}
    />
    <AccountHelper
      defaultMessage="Resend confirmation link?"
      id="https://app.argu.co/i18n/forms/session/confirmationLink/label"
      isActive={isActive}
      to={path.confirmation()}
      onClick={onClick}
    />
    <AccountHelper
      defaultMessage="Account locked?"
      id="https://app.argu.co/i18n/forms/session/accountLocked/label"
      isActive={isActive}
      to={path.newUnlock()}
      onClick={onClick}
    />
  </UnorderedList>
);

AccountHelpers.propTypes = {
  isActive: PropTypes.func,
  onClick: PropTypes.func,
};

const AccountHelpersCardAppendix = ({ currentSubject, onClick }) => (
  <CardAppendix>
    <CardRow backdrop>
      <CardContent endSpacing>
        <AccountHelpers
          isActive={(to) => () => new URL(to).pathname === new URL(currentSubject.value).pathname}
          onClick={onClick}
        />
      </CardContent>
    </CardRow>
  </CardAppendix>
);

AccountHelpersCardAppendix.propTypes = {
  currentSubject: linkType,
  onClick: PropTypes.func,
};

export default AccountHelpersCardAppendix;
