import classNames from 'classnames';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import './Grid.scss';

class Grid extends TopologyProvider {
  constructor() {
    super();

    this.topology = NS.argu('grid');
  }

  render() {
    const classes = classNames({
      Grid: true,
    });

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Grid;
