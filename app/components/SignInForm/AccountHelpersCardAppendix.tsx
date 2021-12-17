import { Node } from '@ontologies/core';
import { Resource } from 'link-redux';
import React from 'react';

import app from '../../ontology/app';
import { CardAppendix } from '../../topologies/Card';
import { IsActiveCheck } from '../Link';
import { LoadingHidden } from '../Loading';

export interface AccountHelpersCardAppendixProps {
  currentSubject: Node;
  onClick: React.MouseEventHandler;
}

const AccountHelpersCardAppendix = ({
  currentSubject,
  onClick,
}: AccountHelpersCardAppendixProps): JSX.Element => {
  const isActive = React.useCallback<IsActiveCheck>(
    (to: string) => () => new URL(to).pathname === new URL(currentSubject.value).pathname,
    [currentSubject.value],
  );

  return (
    <CardAppendix>
      <Resource
        currentSubject={currentSubject}
        isActive={isActive}
        subject={app.ns('menus/session')}
        onClick={onClick}
        onLoad={LoadingHidden}
      />
    </CardAppendix>
  );
};

export default AccountHelpersCardAppendix;
