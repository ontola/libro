import { Node } from '@ontologies/core';
import { Resource } from 'link-redux';
import React from 'react';

import { IsActiveCheck } from '../../../Common/components/Link';
import { CardAppendix } from '../../../Common/topologies/Card';
import { LoadingHidden } from '../../../Core/components/Loading';
import app from '../../../Core/ontology/app';

export interface AccountHelpersCardAppendixProps {
  currentSubject: Node;
  onClick: React.MouseEventHandler;
}

const AccountHelpersCardAppendix = ({
  currentSubject,
  onClick,
}: AccountHelpersCardAppendixProps): JSX.Element => {
  const isActive = React.useCallback<IsActiveCheck>(
    (to: string) => new URL(to).pathname === new URL(currentSubject.value).pathname,
    [currentSubject.value],
  );

  return (
    <CardAppendix>
      <Resource
        currentSubject={currentSubject}
        isActive={isActive}
        subject={app.ns('menus/sign_in')}
        onClick={onClick}
        onLoad={LoadingHidden}
      />
    </CardAppendix>
  );
};

export default AccountHelpersCardAppendix;
