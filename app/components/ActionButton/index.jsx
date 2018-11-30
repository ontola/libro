import {
  linkType,
  subjectType,
  topologyType,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import { countInParentheses } from '../../helpers/numbers';
import { NS } from '../../helpers/LinkedRenderStore';

const defaultTopology = NS.argu('cardList');

class ActionButton extends React.PureComponent {
  static propTypes = {
    count: linkType,
    name: linkType,
    onClick: PropTypes.func,
    subject: subjectType,
    topology: topologyType,
  };

  render() {
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
    const className = topology === defaultTopology ? 'card-list' : 'card-float';

    return (
      <Button plain className={`Button--${className}`} href={href} onClick={onClick}>
        {label}
      </Button>
    );
  }
}

export default ActionButton;
