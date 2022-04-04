import { WithStyles, withStyles } from '@material-ui/styles';
import { TopologyProvider } from 'link-redux';

import { contentDetailsTopology } from '../../topologies';

const styles = {
  contentDetails: {
    marginBottom: '.5em',
    overflow: 'hidden',
  },
};

class ContentDetails extends TopologyProvider<WithStyles<typeof styles>> {
  constructor(props: WithStyles<typeof styles>) {
    super(props);

    this.className = props.classes.contentDetails;
    this.topology = contentDetailsTopology;
  }
}

export default withStyles(styles)(ContentDetails);
