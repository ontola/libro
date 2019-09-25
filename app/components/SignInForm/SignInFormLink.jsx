import { lrsType, withLRS } from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import path, { currentLocation } from '../../helpers/paths';
import Link from '../Link';

const SignInFormLink = ({
  Component = Link,
  children,
  label,
  location,
  lrs,
}) => {
  const redirectURL = currentLocation(location).value;

  return (
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
};

SignInFormLink.propTypes = {
  Component: PropTypes.elementType,
  children: PropTypes.node,
  label: PropTypes.node,
  location: PropTypes.shape({
    href: PropTypes.string,
  }),
  lrs: lrsType,
};

const SignInFormLinkConnected = withRouter(withLRS(SignInFormLink));

export default SignInFormLinkConnected;
