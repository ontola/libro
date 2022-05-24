import rdf from '@ontologies/core';
import { useLinkRenderContext } from 'link-redux';
import React, { MouseEventHandler } from 'react';

import { countInParentheses } from '../../helpers/numbers';
import { listTopology } from '../../topologies';
import Button from '../Button';

interface ActionButtonProps {
  count?: number;
  name: string;
  onClick: MouseEventHandler;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  count,
  name,
  onClick,
}) => {
  const { subject, topology } = useLinkRenderContext();
  const label = `${name} ${countInParentheses(count)}`;
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
