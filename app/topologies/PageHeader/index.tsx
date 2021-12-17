import clsx from 'clsx';
import {
  TopologyProvider,
  Type,
} from 'link-redux';
import React from 'react';

import './PageHeader.scss';
import argu from '../../ontology/argu';
import { Size } from '../../themes/themes';
import Container from '../Container';

export { default as PageHeaderImage } from './PageHeaderImage';
export { default as PageHeaderImageAndTextWrapper } from './PageHeaderImageAndTextWrapper';
export { default as PageHeaderMenuItems } from './PageHeaderMenuItems';
export { default as PageHeaderText } from './PageHeaderText';

export const pageHeaderTopology = argu.ns('pageHeader');

const defaultPercentage = 50;

export interface PageHeaderProps {
  // URL to the background image
  background?: string;
  // Number between 0 and 100
  positionY?: number;
}

/**
 * Page filler with title and nav items at the top of a page
 * Strechtes to big size when a background is present
 * @returns {component} Component
 */
class PageHeader extends TopologyProvider<PageHeaderProps> {
  constructor(props: PageHeaderProps) {
    super(props);

    this.className = 'PageHeader';
    this.topology = pageHeaderTopology;
  }

  render() {
    const style: React.CSSProperties = {};
    const className = clsx({
      PageHeader,
      PageHeader__background: this.props.background,
    });

    if (this.props.background) {
      style.backgroundImage = `url(${this.props.background})`;

      style.backgroundPositionY = `${this.props.positionY || defaultPercentage}%`;
    }

    return (
      <div className={className}>
        <div
          className="PageHeader__inner"
          style={style}
        >
          <Container size={Size.Large}>
            {this.wrap((
              this.props.children || <Type />
            ))}
          </Container>
        </div>
      </div>
    );
  }
}

export default PageHeader;
