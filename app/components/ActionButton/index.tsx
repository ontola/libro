import rdf, { Literal } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import React, { MouseEventHandler } from 'react';

import { listTopology } from '../../topologies';
import Button from '../Button';

interface ActionButtonProps {
  name: Literal;
  onClick: MouseEventHandler;
  subject: SomeNode;
  topology: SomeNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  name,
  onClick,
  subject,
  topology,
}) => {
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
      {name.value}
    </Button>
  );
};

export default ActionButton;
