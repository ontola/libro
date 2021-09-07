import { withStyles } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles/withStyles/withStyles';
import React from 'react';

import argu from '../../ontology/argu';
import { LibroTheme } from '../../themes/themes';
import Topology from '../Topology';

import ContainerFloat from './ContainerFloat';

export interface ContainerHeaderProps {
  /** The children float to the left */
  children: React.ReactNode,
  /** The float content floats to the right */
  float: React.ReactNode,
}

const HEADER_GAP = 4;

const styles = (theme: LibroTheme) => ({
  containerHeader: {
    '& .Heading': {
      marginBottom: 0,
    },
    alignItems: 'center',
    display: 'flex',
    marginBottom: '1rem',
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    gap: theme.spacing(HEADER_GAP),
  },
});

/**
 * In the top right corner of a container
 */
export const containerHeaderTopology = argu.ns('containerHeader');

export interface ContainerHeaderProps {
  children: React.ReactNode
  classes: ClassNameMap;
}

/**
 * Holds a header and menu items that float to the top right of the container
 * @returns {component} Component
 */
class ContainerHeader extends Topology<ContainerHeaderProps> {

  constructor(props: ContainerHeaderProps) {
    super(props);

    this.topology = containerHeaderTopology;
  }

  public render() {
    return this.wrap((
      <div className={this.props.classes.containerHeader}>
        <div className={this.props.classes.header}>
          {this.props.children}
        </div>
        <ContainerFloat>
          {this.props.float}
        </ContainerFloat>
      </div>
    ));
  }
}

export default withStyles(styles)(ContainerHeader);
