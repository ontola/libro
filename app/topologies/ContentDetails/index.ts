import { WithStyles, withStyles } from '@mui/styles';
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

    this.className = this.getClassName();
    this.topology = contentDetailsTopology;
  }

  public getClassName(): string {
    return this.props.classes.contentDetails;
  }
}

export default withStyles(styles)(ContentDetails);
