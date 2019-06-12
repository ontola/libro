import { TopologyProvider, Type, link } from 'link-redux';
import React from 'react';

import './PageHeader.scss';

import { NS } from '../../helpers/LinkedRenderStore';
import Container from '../Container';

export { default as PageHeaderImage } from './PageHeaderImage';
export { default as PageHeaderImageAndTextWrapper } from './PageHeaderImageAndTextWrapper';
export { default as PageHeaderMenuItems } from './PageHeaderMenuItems';
export { default as PageHeaderText } from './PageHeaderText';

export const pageHeaderTopology = NS.argu('pageHeader');

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
    return (
      <div className={this.className}>
        <div className="PageHeader__container">
          <Container size="large">
            {this.wrap((
              this.props.children || <Type />
            ))}
          </Container>
        </div>
      </div>
    );
  }
}

export default link([NS.schema.name])(PageHeader);
