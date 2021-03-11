import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { Collapse } from 'react-collapse';

import './Collapsible.scss';

const REACT_COLLAPSE_TRANSITION_TIME_MS = 200;

interface CollapsibleProps {
  /** Mount children if closed. */
  alwaysMountChildren?: boolean;
  /** @internal */
  hideChildren: boolean;
  /**
   * Linting disabled due to unreleased patch
   * https://github.com/yannickcr/eslint-plugin-react/issues/1751
   * @internal
   */
  notOpened: () => any;
  /** Function that should dispatch a toggle action to open / close the Collapsible. */
  onClickToggle?: () => any;
  opened?: boolean;
  /** Should the first part of the content be visible when collapsed */
  preview?: boolean;
  /** Optional node that functionas as a clickable toggle. */
  trigger?: ReactNode;
  /** Content that's always visible, but does not work as a clickable toggle. */
  visibleContent?: ReactNode;
}

const defaultProps = {
  alwaysMountChildren: false,
  opened: false,
};

const initialStyle = {
  height: '0px',
  overflow: 'hidden',
};

class Collapsible extends React.PureComponent<CollapsibleProps> {
  public static defaultProps = defaultProps;

  constructor(props: CollapsibleProps) {
    super(props);

    this.state = {};
  }

  public componentDidUpdate() {
    if (!this.props.opened && !this.props.hideChildren) {
      if (typeof window !== 'undefined') {
        if (this.timeout) {
          window.clearTimeout(this.timeout);
        }
        this.timeout = window.setTimeout(this.props.notOpened, REACT_COLLAPSE_TRANSITION_TIME_MS);
      } else {
        this.props.notOpened();
      }
    }

    return null;
  }

  public componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.clearTimeout(this.timeout);
    }
  }

  public timeout: number | undefined = undefined;

  public render() {
    const {
      alwaysMountChildren,
      children,
      hideChildren,
      onClickToggle,
      preview,
      opened,
      trigger,
      visibleContent,
    } = this.props;

    const triggerElem = (
      <a
        className="Collapsible__trigger"
        href="/"
        onClick={(e) => {
          e.preventDefault();
          if (onClickToggle) {
            onClickToggle();
          }
        }}
      >
        {trigger}
      </a>
    );

    const tabIndex = opened ? undefined : -1;
    const classes = clsx({
      'Collapsible': true,
      'Collapsible--preview': preview,
    });

    return (
      <div aria-expanded={opened} className={classes}>
        {trigger && (
          <div className="Collapsible__trigger-wrapper">{triggerElem}</div>
        )}
        <div className="Collapsible__visible-content">{visibleContent}</div>
        <Collapse
          initialStyle={initialStyle}
          isOpened={!!opened}
        >
          <div
            aria-hidden={tabIndex === -1 ? true : tabIndex}
            className="Collapsible__invisible-content"
            hidden={!alwaysMountChildren && hideChildren}
          >
            {(alwaysMountChildren || !hideChildren) && children}
          </div>
        </Collapse>
      </div>
    );
  }
}

export default Collapsible;
