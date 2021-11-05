import clsx from 'clsx';
import { TopologyProvider } from 'link-redux';
import React, {
  KeyboardEvent,
  MouseEvent,
  MouseEventHandler,
} from 'react';

import { convertOnClick } from '../../helpers/keyboard';
import argu from '../../ontology/argu';

import './HoverBox.scss';

export interface HoverBoxProps {
  /** Always visible. Functions as a trigger that responds to hover or focus. */
  children: JSX.Element | JSX.Element[],
  /** Only show when hovering over the trigger / children */
  hiddenChildren: JSX.Element,
  onClick?: MouseEventHandler,
  popout?: boolean;
  shine?: boolean;
}

interface HoverBoxState {
  isVisible: boolean;
}

export const hoverBoxTopology = argu.ns('cardHover');

/**
 * Mouse-first component designed to add some extra info where requested. Since it uses 'hover'
 * state, make sure to add functionality for touch users.
 * @returns {component} Component
 */
class HoverBox extends TopologyProvider<HoverBoxProps, HoverBoxState> {
  /**
   * Mouse-first component designed to add some extra info where requested. Since it uses 'hover'
   * state, make sure to add functionality for touch users.
   * @returns {component} Component
   */
  constructor(props: HoverBoxProps) {
    super(props);

    this.state = {
      isVisible: false,
    };
    this.topology = hoverBoxTopology;

    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.showContent = this.showContent.bind(this);
    this.hideContent = this.hideContent.bind(this);
  }

  handleOnMouseEnter(): void {
    this.showContent();
  }

  handleOnMouseLeave(): void {
    this.hideContent();
  }

  handleOnFocus(): void {
    this.showContent();
  }

  handleOnKeyUp(e: KeyboardEvent<HTMLSpanElement>): void {
    if (this.props.onClick) {
      convertOnClick(e, this.props.onClick);
    }
  }

  handleOnBlur(): void {
    this.hideContent();
  }

  handleOnClick(e: MouseEvent<HTMLSpanElement>): void {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  showContent(): void {
    this.setState({
      isVisible: true,
    });
  }

  hideContent(): void {
    this.setState({
      isVisible: false,
    });
  }

  // The trigger is always visible and contains the children.
  // When the user hovers over them, the hiddenChildren appear.
  trigger(children: JSX.Element | JSX.Element[]): JSX.Element {
    return (
      <span
        className="HoverBox-trigger"
        data-testid="HoverBox-trigger"
        tabIndex={0}
        onBlur={this.handleOnBlur}
        onClick={this.handleOnClick}
        onFocus={this.handleOnFocus}
        onKeyUp={this.handleOnKeyUp}
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
      >
        {children}
      </span>
    );
  }

  classNames(): string {
    if (this.state.isVisible) {
      return clsx({
        'HoverBox__hidden-part--visible': true,
        'HoverBox__hidden-part--visible--popout': this.props.popout,
      });
    }

    return 'HoverBox__hidden-part--hidden';
  }

  render() {
    return this.wrap((
      <div
        className={`HoverBox ${this.props.shine && 'HoverBox--shine'}`}
        data-testid="HoverBox"
      >
        {this.trigger(this.props.children)}
        <div className={`HoverBox__hidden-part ${this.classNames()}`}>
          {!this.props.popout && this.props.children}
          {this.state.isVisible && this.props.hiddenChildren}
        </div>
      </div>
    ));
  }
}

export default HoverBox;
