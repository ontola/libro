import './LabelValue.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node,
  /** The smaller text that is displayed at the bottom. */
  label: PropTypes.string.isRequired,
  /** The big text (should be a value) that is displayed at the top */
  value: PropTypes.string.isRequired,
};

const LabelValue = ({
  children,
  label,
  value,
}) => (
  <div className="LabelValue">
    <div className="LabelValue__value">{value}</div>
    <div className="LabelValue__label">{label}</div>
    {children}
  </div>
);

LabelValue.propTypes = propTypes;

export default LabelValue;
