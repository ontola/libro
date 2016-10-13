import React, { PropTypes } from 'react';

const propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  midAngle: PropTypes.number.isRequired,
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const HALF_CIRCLE_RADIUS = 180;
const RADIAN = Math.PI / HALF_CIRCLE_RADIUS;

const DonutChartLabels = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}) => {
  const THRESHOLD = 0.02;
  const LABEL_POS_COEF = 1.25;

  const radius = innerRadius + ((outerRadius - innerRadius) * LABEL_POS_COEF);
  const x = cx + (radius * Math.cos(-midAngle * RADIAN));
  const y = cy + (radius * Math.sin(-midAngle * RADIAN));

  if (percent <= THRESHOLD) {
    return undefined;
  }

  return (
    <text
      x={x}
      y={y}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="DonutChart__label"
    >{name}</text>
  );
};

DonutChartLabels.propTypes = propTypes;

export default DonutChartLabels;
