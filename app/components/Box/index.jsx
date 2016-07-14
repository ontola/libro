// @flow
import './box.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  ghost: PropTypes.bool,
};

const defaultProps = {
  children: '',
  ghost: false,
};

const Box = ({ children, ghost }) => {
  const boxClass = classNames({
    Box: true,
    'Box--ghost': ghost,
  });

  return (
    <div className={boxClass}>
      <div className="Box__content">
        {children}
      </div>
    </div>
  );
};

Box.propTypes = propTypes;
Box.defaultProps = defaultProps;

export default Box;
