
import React, { PropTypes } from 'react';
import './Collapsible.scss';
import ReactCollapse from 'react-collapse';

const propTypes = {
  id: PropTypes.any,
  children: PropTypes.node.isRequired,
  onClickToggle: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  trigger: PropTypes.node.isRequired,
  visibleContent: PropTypes.node,
};

const defaultProps = {
  opened: false,
};

const Collapsible = ({ children, onClickToggle, opened, trigger, visibleContent }) => {
  const triggerElem = (
    <a
      className="Collapsible__trigger"
      href="javascript:void(0);"
      onClick={
        () => onClickToggle()
      }
    >
      {trigger}
    </a>
  );

  return (
    <div className="Collapsible">
      {triggerElem}
      {visibleContent}
      <ReactCollapse isOpened={opened} >
        {children}
      </ReactCollapse>
    </div>
  );
};

Collapsible.propTypes = propTypes;
Collapsible.defaultProps = defaultProps;

export default Collapsible;
