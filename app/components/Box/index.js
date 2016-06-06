import './box.scss';
import React, { PropTypes } from 'react';
import { BoxActions } from '../';

function Box({ children, type }) {
  return (
    <div className="box">

      <div className="box__content">
        {children}
      </div>

      <BoxActions type={type} />
    </div>
  );
}

Box.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf([
    'motion',
    'argument',
    'default'
  ]),
};

Box.defaultProps = {
  children: [],
  type: 'default',
};

export default Box;
