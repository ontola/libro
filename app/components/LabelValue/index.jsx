import './LabelValue.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const LabelValue = ({
  children,
  label,
  value,
}) => (
  <div>
    <div className="LabelValue__value">{value}</div>
    <div className="LabelValue__label">{label}</div>
    {children}
  </div>
);

LabelValue.propTypes = propTypes;

export default LabelValue;
