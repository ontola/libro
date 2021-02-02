import rdf, { Literal } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import React, { EventHandler } from 'react';

import { countInParentheses } from '../../helpers/numbers';
import argu from '../../ontology/argu';
import Button from '../Button';

const defaultTopology = argu.cardList;

interface ActionButtonProps {
  count: Literal;
  name: Literal;
  onClick: EventHandler<any>;
  subject: SomeNode;
  topology: SomeNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  count,
  name,
  onClick,
  subject,
  topology,
}) => {
  const label = `${name.value} ${countInParentheses(count)}`;
  const parsedURL = subject && new URL(subject.value);
  const href = parsedURL && parsedURL.pathname + parsedURL.search;
  const className = rdf.equals(topology, defaultTopology) ? 'card-list' : 'card-float';

  return (
    <Button plain className={`Button--${className}`} href={href} onClick={onClick}>
      {label}
    </Button>
  );
};

export default ActionButton;
