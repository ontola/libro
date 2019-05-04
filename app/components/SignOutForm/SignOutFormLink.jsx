import { linkType, lrsType, withLRS } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Link from '../Link';

const SignOutFormLink = ({
  Component = Link,
  children,
  label,
  lrs,
  redirectURL,
}) => (
  <Component
    icon="sign-out"
    label={label}
    onClick={(e) => {
      e.preventDefault();
      lrs.actions.app.startSignOut(redirectURL);
    }}
  >
    {children || (
    <FormattedMessage
      defaultMessage="Log out"
      id="https://app.argu.co/i18n/forms/signOut/link/label"
    />
    )}
  </Component>
);

SignOutFormLink.propTypes = {
  Component: PropTypes.elementType,
  children: PropTypes.node,
  label: PropTypes.node,
  location: PropTypes.shape({
    href: PropTypes.string,
  }),
  lrs: lrsType,
  redirectURL: linkType,
};

const SignOutFormLinkConnected = withLRS(SignOutFormLink);

export default SignOutFormLinkConnected;
