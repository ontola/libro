import rdf, { Literal } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import React, { MouseEventHandler } from 'react';

import { countInParentheses } from '../../helpers/numbers';
import { listTopology } from '../../topologies';
import Button from '../Button';

interface ActionButtonProps {
  count: Literal;
  name: Literal;
  onClick: MouseEventHandler;
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
  const isList = rdf.equals(topology, listTopology);

  return (
    <Button
      plain
      cardFloat={!isList}
      href={href}
      list={isList}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default ActionButton;
