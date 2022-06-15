import {
  WithStyles,
  createStyles,
  withStyles, 
} from '@mui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { PropsWithChildren } from 'react';

import { LibroTheme } from '../../themes/themes';
import { attributeListTopology } from '../../topologies';
import Topology, { TopologyContent } from '../Topology';

const styles = (theme: LibroTheme) => createStyles({
  attributeList: {
    '& a': {
      '&:hover': {
        textDecoration: 'underline',
      },
      display: 'block',
      fontWeight: 'normal',
      textDecoration: 'underline',
    },

    '& label': {
      color: theme.palette.grey.midDark,
    },

    '& td': {
      padding: '.3em 0',
    },

    '& th': {
      color: theme.palette.grey.midDark,
      fontWeight: 600,
      paddingRight: '1rem',
      textAlign: 'left',
    },

    '&:not(&--full-label)': {
      'th': {
        width: '30%',
      },
    },
    marginBottom: '.6rem',
  },
});

type AttributeListProps = WithStyles<typeof styles> & {
  fullLabel?: boolean;
};

class AttributeList extends Topology<PropsWithChildren<AttributeListProps>> {
  public static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    fullLabel: PropTypes.bool,
  };

  public static defaultProps = {
    fullLabel: true,
  };

  constructor(props: AttributeListProps) {
    super(props);

    this.elementType = 'table';
    this.topology = attributeListTopology;
  }

  public getClassName(): string {
    return clsx({
      [this.props.classes.attributeList]: true,
      [`${this.props.classes.attributeList}--full-label`]: (this.props as any).fullLabel,
    });
  }

  public renderContent(): TopologyContent {
    return this.wrap((subject) => (
      <table
        className={this.getClassName()}
        resource={subject && subject.value}
        style={this.getStyle()}
      >
        <tbody>
          {this.props.children}
        </tbody>
      </table>
    ));
  }
}

export default withStyles(styles)(AttributeList);
