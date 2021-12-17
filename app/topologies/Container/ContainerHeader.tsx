import { withStyles } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles/withStyles/withStyles';
import clsx from 'clsx';
import React from 'react';

import { headingCID } from '../../components/Heading';
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
    [`& .${headingCID}`]: {
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
  invertColors: {
    [`& .${headingCID}, & .MuiIconButton-root`]: {
      color: theme.palette.common.white,
      textShadow: '0 0 2px rgb(0 0 0 / 50%)',
    },
  },
});

/**
 * In the top right corner of a container
 */
export const containerHeaderTopology = argu.ns('containerHeader');

export interface ContainerHeaderProps {
  children: React.ReactNode
  classes: ClassNameMap;
  invertColors: boolean;
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
    const classes = clsx({
      [this.props.classes.containerHeader]: true,
      [this.props.classes.invertColors]: this.props.invertColors,
    });

    return this.wrap((
      <div className={classes}>
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
