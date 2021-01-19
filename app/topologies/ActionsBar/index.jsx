import clsx from 'clsx';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import argu from '../../ontology/argu';

import './ActionsBar.scss';

export const actionsBarTopology = argu.actionsBar;

class ActionsBar extends TopologyProvider {
  static propTypes = {
    small: PropTypes.bool,
  };

  constructor() {
    super();

    this.className = 'ActionsBar';
    this.topology = actionsBarTopology;
  }

  render() {
    const classes = clsx({
      ActionsBar: true,
      'ActionsBar--small': this.props.small,
    });

    if (this.props.children === undefined) {
      return null;
    }

    return this.wrap((
      <div className={classes}>
        {this.props.children}
      </div>
    ));
  }
}

export default ActionsBar;
