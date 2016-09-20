import './LabelValueBar.scss';
import React, { PropTypes } from 'react';
import { percentageToRedOrGreen } from 'helpers/color';

const propTypes = {
  children: PropTypes.node,
  coloredValue: PropTypes.bool,
  isPercentage: PropTypes.bool,
  label: PropTypes.string.isRequired,
  showBar: PropTypes.bool,
  value: PropTypes.number.isRequired,
};

const defaultProps = {
  coloredValue: false,
  isPercentage: false,
  showBar: false,
};

const LabelValueBar = ({
  children,
  coloredValue,
  isPercentage,
  label,
  showBar,
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
    {showBar && <div
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
