import './LabelValueBar.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isPercentage: PropTypes.bool,
};

const LabelValueBar = ({
  children,
  label,
  value,
  isPercentage,
}) => (
  <div className="LabelValueBar">
    <div className="LabelValueBar__label">{label}</div>
    <div className="LabelValueBar__value">{value}%</div>
    {isPercentage && <div className="LabelValueBar__bar" style={{ width: `${value}%` }} />}
    {children}
  </div>
);

LabelValueBar.propTypes = propTypes;

export default LabelValueBar;
