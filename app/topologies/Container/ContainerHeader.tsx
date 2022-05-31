import { WithStyles, withStyles } from '@mui/styles';
import React from 'react';

import { headingCID } from '../../components/Heading';
import { LibroTheme } from '../../themes/themes';
import { containerHeaderTopology } from '../../topologies';
import Topology from '../Topology';

import ContainerFloat from './ContainerFloat';

const HEADER_GAP = 4;

const styles = (theme: LibroTheme) => ({
  containerHeader: {
    [`& .${headingCID}`]: {
      marginBottom: 0,
    },
    alignItems: 'center',
    display: 'flex',
    marginBottom: '1rem',
    marginTop: '1rem',
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    gap: theme.spacing(HEADER_GAP),
    paddingBottom: '5px',
    paddingTop: '5px',
  },
});

interface ContainerHeaderProps extends WithStyles<typeof styles> {
  /** The children float to the left */
  children: React.ReactNode;
  /** The float content floats to the right */
  float: React.ReactNode,
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
