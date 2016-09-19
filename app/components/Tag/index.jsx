import './Tag.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
};

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
