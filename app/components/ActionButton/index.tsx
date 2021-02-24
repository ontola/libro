import rdf, { Literal, Node, SomeTerm } from '@ontologies/core';
import React, { EventHandler } from 'react';
import { countInParentheses } from '../../helpers/numbers';
import argu from '../../ontology/argu';
import Button from '../Button';

const defaultTopology = argu.cardList;

export interface ActionButtonProps {
  count: Literal;
  name: SomeTerm;
  onClick: EventHandler<any>;
  subject: Node;
  topology: Node;
}

class ActionButton extends React.PureComponent<ActionButtonProps> {

  public render() {
    const {
      count,
      name,
      onClick,
      subject,
      topology,
    } = this.props;

    const label = `${name.value} ${countInParentheses(count)}`;
    const parsedURL = subject && new URL(subject.value);
    const href = parsedURL && parsedURL.pathname + parsedURL.search;
    const className = rdf.equals(topology, defaultTopology) ? 'card-list' : 'card-float';

    return (
      <Button plain className={`Button--${className}`} href={href} onClick={onClick}>
        {label}
      </Button>
    );
  }
}

export default ActionButton;
