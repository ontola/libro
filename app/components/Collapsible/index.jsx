
import React, { PropTypes } from 'react';
import './Collapsible.scss';
import ReactCollapse from 'react-collapse';

const propTypes = {
  /** Content that is not always visible. */
  children: PropTypes.node.isRequired,
  /** Function that should dispatch a toggle action to open / close the Collapsible. */
  onClickToggle: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  /** This is what the user clicks to toggle the collapsible. */
  trigger: PropTypes.node.isRequired,
  /** Content that's always visible, but does not work as a clickable toggle. */
  visibleContent: PropTypes.node,
};

const defaultProps = {
  opened: false,
};

const Collapsible = ({
  children,
  onClickToggle,
  opened,
  trigger,
  visibleContent,
}) => {
  const triggerElem = (
    <a
      href="/"
      className="Collapsible__trigger"
      onClick={(e) => {
        e.preventDefault();
        onClickToggle();
      }}
    >{trigger}</a>
  );

  return (
    <div className="Collapsible">
      <div className="Collapsible__trigger-wrapper">{triggerElem}</div>
      <div className="Collapsible__visible-content">{visibleContent}</div>
      <div className="Collapsible__invisible-content">
        <ReactCollapse isOpened={opened}>
          {children}
        </ReactCollapse>
      </div>
    </div>
  );
};

Collapsible.propTypes = propTypes;
Collapsible.defaultProps = defaultProps;

export default Collapsible;
