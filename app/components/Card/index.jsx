import classNames from 'classnames';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import './Card.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  fixed: PropTypes.bool,
  shine: PropTypes.bool,
  warn: PropTypes.bool,
};

const defaultProps = {
  fixed: false,
  shine: false,
  warn: false,
};

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class Card extends TopologyProvider {
  constructor(props) {
    super(props);

    this.topology = NS.argu('card');
  }

  render() {
    const classes = classNames({
      Card: true,
      'Card--fixed': this.props.fixed,
      'Card--shine': this.props.shine,
      'Card--warn': this.props.warn,
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
export { default as CardAppendix } from './CardAppendix';
export { default as CardButton } from './CardButton';
export { default as CardContent } from './CardContent';
export { default as CardDivider } from './CardDivider';
export { default as CardFixed } from './CardFixed';
export { default as CardLink } from './CardLink';
export { default as CardMenuFloater } from './CardMenuFloater';
export { default as CardRow } from './CardRow';
export { default as CardMain } from './CardMain';
export default Card;
