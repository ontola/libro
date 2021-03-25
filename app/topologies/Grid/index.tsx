import { Grid as MaterialGrid } from '@material-ui/core';
import { TopologyProvider } from 'link-redux';
import React from 'react';

import { LoadingFullResource } from '../../components/Loading';
import Suspense from '../../components/Suspense';
import argu from '../../ontology/argu';

import './Grid.scss';

export const gridTopology = argu.grid;

type GridProps = Record<string, unknown>;

class Grid extends TopologyProvider<GridProps> {
  constructor(props: GridProps) {
    super(props);

    this.topology = gridTopology;
  }

  public render() {
    const { children, ...otherProps } = this.props;

    return this.wrap((
      <Suspense fallback={<LoadingFullResource />}>
        <MaterialGrid container spacing={6} {...otherProps}>
          {children}
        </MaterialGrid>
      </Suspense>
    ));
  }
}

export default Grid;
