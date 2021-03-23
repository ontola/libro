import { Node } from '@ontologies/core';
import { Location } from 'history';
import { useLRS } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { ButtonProps } from '../Button';
import Link, { LinkPropTypes } from '../Link';

export interface SignOutFormLinkProps {
  Component: React.ComponentType<Partial<LinkPropTypes & ButtonProps> & { icon?: string; label?: string }>;
  children: JSX.Element;
  label: string;
  location: Location;
  redirectURL: Node;
}

const SignOutFormLink = ({
  Component,
  children,
  label,
  redirectURL,
}: SignOutFormLinkProps): JSX.Element => {
  const lrs = useLRS();

  return (
    <Component
      icon="sign-out"
      label={label}
      onClick={(e: React.MouseEvent) => {
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
};

SignOutFormLink.defaultProps = {
  Component: Link,
};

export default SignOutFormLink;
