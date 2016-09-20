import React, { PropTypes } from 'react';
import { Sector } from 'recharts';
import { browserHistory } from 'react-router';

const propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  endAngle: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
  innerRadius: PropTypes.number.isRequired,
  link: PropTypes.string,
  name: PropTypes.string.isRequired,
  outerRadius: PropTypes.number.isRequired,
  startAngle: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};

const POS_KEY = 2;
const POS_VAL = 14;
const SECTOR_EXTRA_RADIUS = 3;

const DonutChartActiveShape = ({
  cx,
  cy,
  endAngle,
  fill,
  innerRadius,
  link,
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
      children={value}
      x={cx}
      y={cy + POS_VAL}
      textAnchor="middle"
    />
    <a
      xlinkHref={link}
      onClick={(e) => {
        e.preventDefault();
        return link && browserHistory.push(link);
      }}
    >
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
    </a>
  </g>
);

DonutChartActiveShape.propTypes = propTypes;

export default DonutChartActiveShape;
