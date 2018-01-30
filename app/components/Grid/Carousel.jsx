import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { Button } from '../../components';

const MIN_PIXELS = 5;
const REFRESH_RATE_MS = 66;
const SCROLL_CORRECTION = 10;

class Grid extends TopologyProvider {
  constructor() {
    super();

    this.state = {
      showLeftButton: false,
      showRightButton: false,
    };
    this.topology = NS.argu('grid');

    this.checkDimensions = this.checkDimensions.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleLeftButtonClick = this.handleLeftButtonClick.bind(this);
    this.handleRightButtonClick = this.handleRightButtonClick.bind(this);
  }

  componentDidMount() {
    this.checkDimensions();
  }

  checkDimensions() {
    const showRight = (
      this.carouselRef.scrollWidth -
      this.carouselRef.scrollLeft -
      this.carouselRef.offsetWidth > MIN_PIXELS
    );

    this.setState({
      showLeftButton: this.carouselRef.scrollLeft > MIN_PIXELS,
      showRightButton: showRight,
    });
  }

  handleLeftButtonClick() {
    const items = this.carouselRef.children;
    const parentWidth = this.carouselRef.offsetWidth;
    const scrollPosition = this.carouselRef.scrollLeft;
    const targetOffset = scrollPosition - parentWidth;

    for (let key = 0; key < items.length; key++) {
      const item = items[key];
      const offsetLeftFromRight = item.offsetLeft - item.offsetWidth;

      if (offsetLeftFromRight > targetOffset) {
        this.carouselRef.scroll({
          behavior: 'smooth',
          left: items[key > 0 ? key - 1 : key].offsetLeft - SCROLL_CORRECTION,
        });
        break;
      }
    }
  }

  handleRightButtonClick() {
    const items = this.carouselRef.children;
    const parentWidth = this.carouselRef.offsetWidth;
    const scrollPosition = this.carouselRef.scrollLeft;
    const targetOffset = parentWidth + scrollPosition;

    for (let key = 0; key < items.length; key++) {
      const item = items[key];
      const offsetLeftFromRight = item.offsetLeft + item.offsetWidth;
      if (offsetLeftFromRight > targetOffset) {
        this.carouselRef.scroll({
          behavior: 'smooth',
          left: item.offsetLeft - SCROLL_CORRECTION,
        });
        break;
      }
    }
  }

  handleScroll() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(this.checkDimensions, REFRESH_RATE_MS);
  }

  render() {
    let leftButton, rightButton;

    if (this.state.showLeftButton) {
      leftButton = (
        <Fragment>
          <div className="Carousel__gradient Carousel__gradient--left" />
          <Button
            plain
            className="Carousel__scrollButton Carousel__scrollButton--left"
            icon="arrow-left"
            onClick={this.handleLeftButtonClick}
          />
        </Fragment>
      );
    }

    if (this.state.showRightButton) {
      rightButton = (
        <Fragment>
          <Button
            plain
            className="Carousel__scrollButton"
            icon="arrow-right"
            onClick={this.handleRightButtonClick}
          />
          <div className="Carousel__gradient Carousel__gradient--right" />
        </Fragment>
      );
    }

    return (
      <div
        className="Carousel__wrapper"
        onScroll={this.handleScroll}
      >
        {leftButton}
        <div
          className="Carousel"
          ref={(ref) => { this.carouselRef = ref; }}
        >
          {this.props.children}
        </div>
        {rightButton}
      </div>
    );
  }
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Grid;
