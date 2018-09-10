import { TopologyProvider } from 'link-redux';

import './PageHeader.scss';

import { NS } from '../../helpers/LinkedRenderStore';

export const pageHeaderTopology = NS.argu('header');

/**
 * Page filler with title and nav items at the top of a page
 * @returns {component} Component
 */
class PageHeader extends TopologyProvider {
  constructor() {
    super();

    this.className = 'PageHeader';
    this.topology = pageHeaderTopology;
  }
}

export default PageHeader;
