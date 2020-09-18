import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';
import Topology from '../Topology';

export const cardWideTopology = argu.cardWide;

/**
 * This is a full-width card-like item.
 * Contrary to a card, it has no shadow.
 * @returns {component} Component
 */
class CardWide extends Topology {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.topology = cardWideTopology;
  }

  getClassName() {
    return this.props.classes.root;
  }
}

const styles = (theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
});

export default withStyles(styles)(CardWide);
