import { Grid as MaterialGrid } from '@material-ui/core';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { LoadingFullResource } from '../../components/Loading';
import argu from '../../ontology/argu';

import './Grid.scss';

export const gridTopology = argu.grid;

class Grid extends TopologyProvider {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.topology = gridTopology;
  }

  render() {
    const { children, ...otherProps } = this.props;

    return this.wrap((
      <React.Suspense fallback={<LoadingFullResource />}>
        <MaterialGrid container spacing={6} {...otherProps}>
          {children}
        </MaterialGrid>
      </React.Suspense>
    ));
  }
}

export default Grid;
