import React, { PropTypes } from 'react';
import { Sector } from 'recharts';

const propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  startAngle: PropTypes.number.isRequired,
  endAngle: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
  midAngle: PropTypes.number.isRequired,
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const POS_KEY = -2;
const POS_VAL = 14;
const SECTOR_EXTRA_RADIUS = 3;

const DonutChartActiveShape = ({
  cx,
  cy,
  endAngle,
  fill,
  innerRadius,
  name,
  outerRadius,
  startAngle,
  value,
}) => (
  <g>
    <text
      className="DonutChart__inner-key"
      children={name}
      x={cx}
      y={cy - POS_KEY}
      textAnchor="middle"
    />
    <text
      className="DonutChart__inner-value"
      children={`${value} zetels`}
      x={cx}
      y={cy + POS_VAL}
      textAnchor="middle"
    />
    <Sector
      cx={cx}
      cy={cy}
      className="DonutChart__sector DonutChart__sector--active"
      innerRadius={innerRadius}
      outerRadius={outerRadius + SECTOR_EXTRA_RADIUS}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  </g>
);

DonutChartActiveShape.propTypes = propTypes;

export default DonutChartActiveShape;
