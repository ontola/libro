import { NamedNode } from '@ontologies/core';
import { useLRS } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { StartSignOut } from '../../../../middleware/actions';
import Button from '../../../Common/components/Button';
import { authMessages } from '../../lib/messages';

export interface SignOutFormLinkProps {
  children: React.ReactNode;
  redirectURL: NamedNode;
}

const SignOutFormLink = ({
  children,
  redirectURL,
}: SignOutFormLinkProps): JSX.Element => {
  const lrs = useLRS();

  return (
    <Button
      icon="sign-out"
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        lrs.actions.get(StartSignOut)(redirectURL);
      }}
    >
      {children ?? (
        <FormattedMessage {...authMessages.signOutLabel} />
      )}
    </Button>
  );
};

export default SignOutFormLink;
