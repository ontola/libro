import classNames from 'classnames';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import './ActionsBar.scss';

const propTypes = {
  small: PropTypes.bool,
};

class ActionsBar extends TopologyProvider {
  constructor() {
    super();

    this.className = 'ActionsBar';
    this.topology = NS.argu('actionsBar');
  }

  render() {
    const classes = classNames({
      ActionsBar: true,
      'ActionsBar--small': this.props.small,
    });

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}

ActionsBar.propTypes = propTypes;

export default ActionsBar;
