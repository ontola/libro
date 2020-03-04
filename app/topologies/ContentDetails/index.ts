import { TopologyProvider } from 'link-redux';

import argu from '../../ontology/argu';

import './ContentDetails.scss';

export const contentDetailsTopology = argu.ns('contentDetails');

class ContentDetails extends TopologyProvider {
  constructor(props: {}) {
    super(props);

    this.className = 'ContentDetails';
    this.topology = contentDetailsTopology;
  }
}

export default ContentDetails;
