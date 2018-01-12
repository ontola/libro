import { TopologyProvider } from 'link-redux';

import './PageHeader.scss';

import { NS } from '../../helpers/LinkedRenderStore';

/**
 * Page filler with title and nav items at the top of a page
 * @returns {component} Component
 */
class PageHeader extends TopologyProvider {
  constructor() {
    super();

    this.className = 'PageHeader';
    this.topology = NS.argu('header');
  }
}

export default PageHeader;
