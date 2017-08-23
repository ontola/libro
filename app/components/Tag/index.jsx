import './Tag.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  /** Label of the tag. */
  children: PropTypes.node.isRequired,
  /** Appears in front of the tag. Has the same background color as the children */
  prefix: PropTypes.node,
  /** Appears to the right of the tag. Has a white background color. */
  suffix: PropTypes.node,
};

/**
 * Tag component. Wrap it in a Link to make it clickable.
 * @returns {component} Component
 */
const Tag = ({
  children,
  prefix,
  suffix,
}) => (
  <div className="Tag">
    {prefix && <div className="Tag__content Tag__content--prefix">{prefix}</div>}
    <div className="Tag__content">{children}</div>
    {suffix && <div className="Tag__content Tag__content--suffix">{suffix}</div>}
  </div>
);

Tag.propTypes = propTypes;

export default Tag;
