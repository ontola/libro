import schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  TopologyProvider,
  Type,
  link,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import './PageHeader.scss';

import argu from '../../ontology/argu';
import Container from '../Container';

export { default as PageHeaderImage } from './PageHeaderImage';
export { default as PageHeaderImageAndTextWrapper } from './PageHeaderImageAndTextWrapper';
export { default as PageHeaderMenuItems } from './PageHeaderMenuItems';
export { default as PageHeaderText } from './PageHeaderText';

export const pageHeaderTopology = argu.ns('pageHeader');

const defaultPercentage = 50;

/**
 * Page filler with title and nav items at the top of a page
 * Strechtes to big size when a background is present
 * @returns {component} Component
 */
class PageHeader extends TopologyProvider {
  constructor(props) {
    super(props);

    this.className = 'PageHeader';
    this.topology = pageHeaderTopology;
  }

  render() {
    const style = {};
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

PageHeader.propTypes = {
  // URL to the background image
  background: PropTypes.string,
  // Number between 0 and 100
  positionY: PropTypes.number,
};

export default link({ name: schema.name })(PageHeader);
