import rdf from '@ontologies/core';
import { useLRS } from 'link-redux';
import React, {
  ReactElement,
  SyntheticEvent,
} from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router';

import path, { CurrentLocationControl } from '../../helpers/paths';
import { useCurrentActor } from '../../hooks/useCurrentActor';
import Link from '../Link';

interface SignInFormLinkProps {
  Component: any;
  label?: string | ReactElement;
}

const SignInFormLink: React.FC<SignInFormLinkProps> = ({
  Component = Link,
  children,
  label,
}) => {
  const lrs = useLRS();
  const location = useLocation();
  const { actorType } = useCurrentActor();
  const redirectURL = CurrentLocationControl(location).value;

  if (actorType?.value !== 'GuestUser') {
    return null;
  }

  return (
    <Component
      icon="sign-in"
      label={label}
      to={path.signIn(redirectURL)}
      onClick={(e: SyntheticEvent<any>) => {
        e.preventDefault();
        lrs.actions.app.startSignIn(rdf.namedNode(redirectURL));
      }}
    >
      {children || label || (
        <FormattedMessage
          defaultMessage="Log in"
          id="https://app.argu.co/i18n/forms/session/link/label"
        />
      )}
    </Component>
  );
};

export default SignInFormLink;
