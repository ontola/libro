// @flow
import './Box.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  children: '',
};

const Box = ({ children }) => (
  <div className="Box">
    <div className="Box__content">
      {children}
    </div>
  </div>
);

Box.propTypes = propTypes;
Box.defaultProps = defaultProps;

export default Box;
