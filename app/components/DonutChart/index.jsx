import './DonutChart.scss';
import React, { Component, PropTypes } from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';


const defaultColors = [
	'#1395BA',
  '#D94E1F',
  '#F16C20',
  '#ECAA38',
  '#EBC844',
  '#A2B86C',
  '#5CA793',
  '#117899',
  '#0F5B78',
  '#0D3C55',
  '#C02E1D',
  '#EF8B2C'
];

const propTypes = {
  colors: PropTypes.array,
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    link: PropTypes.string,
  })).isRequired,
};

const defaultProps = {
  colors: defaultColors,
};

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 1.25
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

 	if (percent <= .02) {
  	return undefined;
  }

  return (
    <text x={x} y={y} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">{name}</text>
  );
};

const renderActiveShape = ({
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  name,
  value,
}) => (
  <g>
    <text x={cx} y={cy - 2} textAnchor="middle" className="innerKey">{name}</text>
    <text	x={cx} y={cy + 14} textAnchor="middle" className="innerValue">{value} zetels</text>
    <Sector
      cx={cx}
      cy={cy}
      className="rechars-sector-hover"
      innerRadius={innerRadius}
      outerRadius={outerRadius + 3}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  </g>
);

class DonutChart extends Component {
  constructor() {
    super();

    this.state = {
      activeIndex: null,
    };

    this.onPieEnter = this.onPieEnter.bind(this);
    this.onPieLeave = this.onPieLeave.bind(this);
  }

  onPieEnter(data, index) {
    this.setState({ activeIndex: index });
  };

  onPieLeave() {
    this.setState({ activeIndex: null });
  };

	render () {
    const {
      colors,
      data,
    } = this.props;

  	return (
    	<PieChart
      	width={250}
        height={250}
        onMouseLeave={this.onPieLeave}
        onMouseEnter={this.onPieEnter}
      >
        <Pie
          data={data}
        	activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
					cx={125}
          cy={125}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={90}
          innerRadius={55}
          startAngle={90}
          endAngle={-270}
          fill={colors[0]}
          isAnimationActive={false}
				>
        	{data.map((entry, index) => <Cell key={index} fill={colors[index % colors.length]} />)}
        </Pie>
      </PieChart>
    );
  }
};

DonutChart.propTypes = propTypes;
DonutChart.defaultProps = defaultProps;

export default DonutChart;
