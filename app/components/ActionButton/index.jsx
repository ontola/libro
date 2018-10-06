import {
  linkType,
  subjectType,
  topologyType,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import { NS } from '../../helpers/LinkedRenderStore';

const defaultTopology = NS.argu('cardList');

class ActionButton extends React.PureComponent {
  static propTypes = {
    name: linkType,
    onClick: PropTypes.func,
    subject: subjectType,
    topology: topologyType,
  };

  render() {
    const {
      name,
      onClick,
      subject,
      topology,
    } = this.props;

    const parsedURL = new URL(subject.value);
    const href = parsedURL && parsedURL.pathname + parsedURL.search;
    const className = topology === defaultTopology ? 'card-list' : 'card-float';

    return (
      <Button plain className={`Button--${className}`} href={href} onClick={onClick}>
        {name.value}
      </Button>
    );
  }
}

export default ActionButton;
