import { TopologyProvider } from 'link-redux';

import { NS } from '../../helpers/LinkedRenderStore';

import './ContentDetails.scss';

export const contentDetailsTopology = NS.argu('contentDetails');

class ContentDetails extends TopologyProvider {
  constructor() {
    super();

    this.className = 'ContentDetails';
    this.topology = contentDetailsTopology;
  }
}

export default ContentDetails;
