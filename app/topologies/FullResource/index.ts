import {
  WithStyles,
  createStyles,
  withStyles, 
} from '@material-ui/styles';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import { PropsWithChildren } from 'react';

import argu from '../../ontology/argu';
import { LibroTheme, Margin } from '../../themes/themes';

export const fullResourceTopology = argu.fullResource;

const styles = (theme: LibroTheme) => createStyles({
  fullResource: {
    marginTop: theme.spacing(Margin.Medium),
    position: 'relative',
  },
});

type FullResourceProps = PropsWithChildren<WithStyles<typeof styles>>;

class FullResource extends TopologyProvider<FullResourceProps> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: FullResourceProps) {
    super(props);

    this.topology = fullResourceTopology;
    this.className = this.props.classes.fullResource;
  }
}

export default withStyles(styles)(FullResource);
