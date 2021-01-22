import clsx from 'clsx';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import argu from '../../ontology/argu';

import './ActionsBar.scss';

export const actionsBarTopology = argu.actionsBar;

interface PropTypes {
  small?: boolean;
}

class ActionsBar extends TopologyProvider<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    this.className = 'ActionsBar';
    this.topology = actionsBarTopology;
  }

  public render() {
    const classes = clsx({
      'ActionsBar': true,
      'ActionsBar--small': this.props.small,
    });

    if (this.props.children === undefined) {
      return <React.Fragment />;
    }

    return this.wrap((
      <div className={classes}>
        {this.props.children}
      </div>
    ));
  }
}

export default ActionsBar;
