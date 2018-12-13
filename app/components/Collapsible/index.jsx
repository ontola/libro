import PropTypes from 'prop-types';
import React from 'react';
import { Collapse } from 'react-collapse';

import './Collapsible.scss';

const REACT_COLLAPSE_TRANSITION_TIME_MS = 200;

const propTypes = {
  /** Mount children if closed. */
  alwaysMountChildren: PropTypes.bool,
  /** Content that is not always visible. */
  children: PropTypes.node.isRequired,
  /** @internal */
  hideChildren: PropTypes.bool.isRequired,
  /**
   * Linting disabled due to unreleased patch
   * https://github.com/yannickcr/eslint-plugin-react/issues/1751
   * @internal
   */
  notOpened: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  /** Function that should dispatch a toggle action to open / close the Collapsible. */
  onClickToggle: PropTypes.func.isRequired,
  opened: PropTypes.bool,
  /** Should the first part of the content be visible when collapsed */
  preview: PropTypes.bool,
  /** Optional node that functionas as a clickable toggle. */
  trigger: PropTypes.node,
  /** Content that's always visible, but does not work as a clickable toggle. */
  visibleContent: PropTypes.node,
};

const defaultProps = {
  alwaysMountChildren: false,
  opened: false,
};

class Collapsible extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate() {
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

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.clearTimeout(this.timeout);
    }
  }

  render() {
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
          onClickToggle();
        }}
      >{trigger}
      </a>
    );

    const tabIndex = () => {
      if (opened) {
        return undefined;
      }
      return -1;
    };

    return (
      <div aria-expanded={opened} className="Collapsible">
        {trigger && (
        <div className="Collapsible__trigger-wrapper">{triggerElem}</div>
        )}
        <div className="Collapsible__visible-content">{visibleContent}</div>
        <Collapse
          forceInitialAnimation
          isOpened={opened}
          springConfig={{
            damping: 30,
            stiffness: 300,
          }}
          theme={preview ? { container: 'Collapsible__container--preview' } : undefined}
        >
          <div
            aria-hidden={tabIndex() === -1 ? true : tabIndex()}
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

Collapsible.propTypes = propTypes;
Collapsible.defaultProps = defaultProps;

export default Collapsible;
