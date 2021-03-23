import { Node } from '@ontologies/core';
import { Resource } from 'link-redux';
import React from 'react';

import app from '../../ontology/app';
import { CardAppendix } from '../../topologies/Card';

export interface AccountHelpersCardAppendixProps {
  currentSubject: Node;
  onClick: React.MouseEventHandler;
}

const AccountHelpersCardAppendix = ({
  currentSubject,
  onClick,
}: AccountHelpersCardAppendixProps): JSX.Element => (
  <CardAppendix>
    <Resource
      currentSubject={currentSubject}
      isActive={(to: string) => () => new URL(to).pathname === new URL(currentSubject.value).pathname}
      subject={app.ns('menus/session')}
      onClick={onClick}
    />
  </CardAppendix>
);

export default AccountHelpersCardAppendix;
