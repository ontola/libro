import PropTypes from 'prop-types';
import React from 'react';
import * as Collapse from 'react-collapse';

import './Collapsible.scss';

const propTypes = {
  /** Mount children if closed. */
  alwaysMountChildren: PropTypes.bool,
  /** Content that is not always visible. */
  children: PropTypes.node.isRequired,
  /** Minimum height in pixels */
  minHeight: PropTypes.number,
  /** Function that should dispatch a toggle action to open / close the Collapsible. */
  onClickToggle: PropTypes.func.isRequired,
  opened: PropTypes.bool,
  /** Optional node that functionas as a clickable toggle. */
  trigger: PropTypes.node,
  /** Content that's always visible, but does not work as a clickable toggle. */
  visibleContent: PropTypes.node,
};

const defaultProps = {
  alwaysMountChildren: true,
  opened: false,
};

const Collapsible = ({
  alwaysMountChildren,
  children,
  onClickToggle,
  minHeight,
  opened,
  trigger,
  visibleContent,
}) => {
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

  const CollapsibleComp = __TEST__ ? Collapse.default : Collapse.default.Collapse;

  return (
    <div aria-expanded={opened} className="Collapsible">
      {trigger &&
        <div className="Collapsible__trigger-wrapper">{triggerElem}</div>
      }
      <div className="Collapsible__visible-content">{visibleContent}</div>
      <div aria-hidden={tabIndex()} className="Collapsible__invisible-content">
        <CollapsibleComp
          isOpened={opened}
          keepCollapsedContent={(minHeight !== undefined)}
          springConfig={{
            damping: 30,
            stiffness: 300,
          }}
          style={{
            minHeight: `${minHeight}px`,
          }}
        >
          {alwaysMountChildren ? children : (opened && children)}
        </CollapsibleComp>
      </div>
    </div>
  );
};

Collapsible.propTypes = propTypes;
Collapsible.defaultProps = defaultProps;

export default Collapsible;
