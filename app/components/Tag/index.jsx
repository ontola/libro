import './Tag.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node,
  left: PropTypes.node,
  link: PropTypes.string.isRequired,
  right: PropTypes.node,
};

const Tag = ({
  children,
  left,
  right,
}) => (
  <div
    className="Tag"
  >
    {left && <div className="Tag__right">
      {left}
    </div>}
    <div className="Tag__center">
      {children}
    </div>
    {right && <div className="Tag__right">
      {right}
    </div>}
  </div>
);

Tag.propTypes = propTypes;

export default Tag;
