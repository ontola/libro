import { TopologyProvider, Type } from 'link-redux';
import React from 'react';

import './PageHeader.scss';

import { NS } from '../../helpers/LinkedRenderStore';

export const pageHeaderTopology = NS.argu('header');

/**
 * Page filler with title and nav items at the top of a page
 * @returns {component} Component
 */
class PageHeader extends TopologyProvider {
  constructor(props) {
    super(props);

    this.className = 'PageHeader';
    this.topology = pageHeaderTopology;
  }

  render() {
    return this.wrap((
      <div className={this.className}>
        <div className="PageHeader__container">
          {this.props.children || <Type />}
        </div>
      </div>
    ));
  }
}

export default PageHeader;
