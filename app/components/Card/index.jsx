import classNames from 'classnames';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import './Card.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  fixed: PropTypes.bool,
};

const defaultProps = {
  fixed: false,
};

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class Card extends TopologyProvider {
  constructor() {
    super();

    this.topology = NS.argu('card');
  }

  render() {
    const classes = classNames({
      Card: true,
      'Card--fixed': this.props.fixed,
    });

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export { default as CardActions } from './CardActions';
export { default as CardButton } from './CardButton';
export { default as CardContent } from './CardContent';
export { default as CardDivider } from './CardDivider';
export { default as CardRow } from './CardRow';
export default Card;
