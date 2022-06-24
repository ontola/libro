import rdf from '@ontologies/core';
import { useLRS } from 'link-redux';
import React, { ReactElement, SyntheticEvent } from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router';

import Link from '../../../Common/components/Link';
import path, { currentLocationControl } from '../../../Common/lib/paths';
import { useCurrentActor } from '../../hooks/useCurrentActor';
import { authMessages } from '../../lib/messages';

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
  const redirectURL = currentLocationControl(location).value;

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
        <FormattedMessage {...authMessages.newSessionLink} />
      )}
    </Component>
  );
};

export default SignInFormLink;
