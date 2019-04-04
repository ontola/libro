import { lrsType, withLRS } from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import path from '../../helpers/paths';
import Link from '../Link';

const SignInFormLink = ({
  Component = Link,
  children,
  label,
  lrs,
  redirectURL,
}) => (
  <Component
    icon="sign-in"
    label={label}
    to={path.signIn(redirectURL)}
    onClick={(e) => {
      e.preventDefault();
      lrs.actions.app.startSignIn(NamedNode.find(path.signIn(redirectURL)));
    }}
  >
    {children || (
      <FormattedMessage
        defaultMessage="Log in"
        id="https://app.argu.co/i18n/forms/session/link/label"
      />
    )}
  </Component>
);

SignInFormLink.propTypes = {
  Component: PropTypes.elementType,
  children: PropTypes.node,
  label: PropTypes.node,
  lrs: lrsType,
  redirectURL: PropTypes.string,
};

const SignInFormLinkConnected = connect(() => ({
  redirectURL: window.location.href,
}))(withLRS(SignInFormLink));

export default SignInFormLinkConnected;
