import React, { PropTypes } from 'react';

import { percentageToRedOrGreen } from 'helpers/color';

import './LabelValueBar.scss';

const propTypes = {
  children: PropTypes.node,
  coloredValue: PropTypes.bool,
  label: PropTypes.string.isRequired,
  isPercentage: PropTypes.bool,
  // Only use with max values of 100
  showBar: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
};

const defaultProps = {
  coloredValue: false,
  isPercentage: false,
  showBar: false,
};

const LabelValueBar = ({
  children,
  coloredValue,
  label,
  showBar,
  isPercentage,
  value,
}) => (
  <div className="LabelValueBar">
    <div className="LabelValueBar__label">{label}</div>
    <div
      className="LabelValueBar__value"
      style={{
        color: coloredValue && percentageToRedOrGreen(value),
      }}
    >
      {value}{isPercentage && '%'}
    </div>
    {showBar && isPercentage &&
      <div
        className="LabelValueBar__bar"
        style={{
          width: `${value}%`,
          borderRightColor: coloredValue && percentageToRedOrGreen(value),
        }}
      />}
    {children}
  </div>
);

LabelValueBar.propTypes = propTypes;
LabelValueBar.defaultProps = defaultProps;

export default LabelValueBar;
