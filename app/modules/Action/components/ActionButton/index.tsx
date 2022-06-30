import rdf from '@ontologies/core';
import { useLinkRenderContext } from 'link-redux';
import React, { MouseEventHandler } from 'react';

import Button from '../../../Common/components/Button';
import { countInParentheses } from '../../../Common/lib/numbers';
import { listTopology } from '../../../Common/topologies/List';

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
