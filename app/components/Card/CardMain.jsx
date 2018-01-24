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
class CardMain extends TopologyProvider {
  constructor() {
    super();

    this.topology = NS.argu('cardMain');
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

CardMain.propTypes = propTypes;
CardMain.defaultProps = defaultProps;

export default CardMain;
