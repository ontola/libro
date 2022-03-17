import { createStyles } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import argu from '../../ontology/argu';
import { LibroTheme } from '../../themes/themes';
import Topology, { TopologyContent } from '../Topology';

export const attributeListTopology = argu.ns('attributeList');

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
