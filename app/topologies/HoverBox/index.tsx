import { createStyles } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { TopologyProvider } from 'link-redux';
import React, {
  KeyboardEvent,
  MouseEvent,
  MouseEventHandler,
} from 'react';

import { convertOnClick } from '../../helpers/keyboard';
import argu from '../../ontology/argu';
import { LibroTheme } from '../../themes/themes';

export const hoverBoxTopology = argu.ns('cardHover');

export type HoverBoxProps = {
  /** Always visible. Functions as a trigger that responds to hover or focus. */
  children: JSX.Element | JSX.Element[],
  /** Only show when hovering over the trigger / children */
  hiddenChildren: JSX.Element,
  onClick?: MouseEventHandler,
  popout?: boolean;
  shine?: boolean;
};

type HoverBoxPropsWithStyle = HoverBoxProps & WithStyles<typeof styles>;

interface HoverBoxState {
  isVisible: boolean;
}

const styles = (theme: LibroTheme) => createStyles({
  '@keyframes hb-highlight' :{
    '0%' :{
      boxShadow: 'none',
    },

    '50%' :{
      animationTimingFunction: 'ease-in',
      boxShadow: `0 0 1em ${theme.palette.green.light}`,
    },

    '100%': {
      animationTimingFunction: 'ease-out',
      boxShadow: 'none',
    },
  },
  hiddenPart: {
    display: 'none',
    pointerEvents: 'none',
  },
  hoverBox: {
    display: 'block',
    position: 'relative',
  },
  popout: {
    right: 'auto',
    width: '20em',
  },
  shine: {
    animation: 'hb-highlight 1s 1',
  },
  trigger: {
    '&:focus': {
      outline: 'none',
    },

    display: 'block',
  },
  visible: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.boxShadow.intense,
    display: 'block',
    left: '-10px',
    padding: '10px',
    position: 'absolute',
    right: '-10px',
    top: '-10px',
    zIndex: theme.zIndexHoverBox,
  },
});

/**
 * Mouse-first component designed to add some extra info where requested. Since it uses 'hover'
 * state, make sure to add functionality for touch users.
 * @returns {component} Component
 */
class HoverBox extends TopologyProvider<HoverBoxPropsWithStyle, HoverBoxState> {
  /**
   * Mouse-first component designed to add some extra info where requested. Since it uses 'hover'
   * state, make sure to add functionality for touch users.
   * @returns {component} Component
   */
  constructor(props: HoverBoxPropsWithStyle) {
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
        className={clsx({
          [this.props.classes.hoverBox]: true,
          [this.props.classes.trigger]: true,
        })}
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

  render() {
    return this.wrap((
      <div
        className={clsx({
          [this.props.classes.hoverBox]: true,
          [this.props.classes.shine]: this.props.shine,
        })}
        data-testid="HoverBox"
      >
        {this.trigger(this.props.children)}
        <div
          className={clsx({
            [this.props.classes.hiddenPart]: true,
            [this.props.classes.visible]: this.state.isVisible,
            [this.props.classes.popout]: this.state.isVisible && this.props.popout,
          })}
        >
          {!this.props.popout && this.props.children}
          {this.state.isVisible && this.props.hiddenChildren}
        </div>
      </div>
    ));
  }
}

export default withStyles(styles)(HoverBox);
