import { createStyles } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import { ReactNode } from 'react';

import { headingCID } from '../../components/Heading';
import argu from '../../ontology/argu';
import { LibroTheme, Margin } from '../../themes/themes';

export const tableCellTopology = argu.ns('tableCell');

const styles = (theme: LibroTheme) => createStyles({
  tableCell: {
    [`& .${headingCID}`]: {
      wordBreak: 'normal',
    },
    padding: `${theme.spacing(Margin.Small)} ${theme.spacing(Margin.Large)}`,
    textAlign: 'left',
  },
});

type PropTypes = WithStyles<typeof styles> & {
  children?: ReactNode;
  colspan?: number;
  elementProps?: Record<string, unknown>;
};

class TableCell extends TopologyProvider<PropTypes> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: PropTypes) {
    super(props);

    this.className = this.props.classes.tableCell;
    this.elementType = 'td';
    this.topology = tableCellTopology;
  }
}

export default withStyles(styles)(TableCell);
