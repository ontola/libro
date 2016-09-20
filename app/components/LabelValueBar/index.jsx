import './LabelValueBar.scss';
import React, { PropTypes } from 'react';
import { percentageToRedOrGreen } from 'helpers/color';

const propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  coloredValue: PropTypes.bool,
};

const defaultProps = {
  coloredValue: false,
};

const LabelValueBar = ({
  children,
  coloredValue,
  label,
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
      {value}%
    </div>
    <div
      className="LabelValueBar__bar"
      style={{
        width: `${value}%`,
        borderRightColor: coloredValue && percentageToRedOrGreen(value),
      }}
    />
    {children}
  </div>
);

LabelValueBar.propTypes = propTypes;
LabelValueBar.defaultProps = defaultProps;

export default LabelValueBar;
