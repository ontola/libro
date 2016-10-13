import './DonutChart.scss';
import React, { Component, PropTypes } from 'react';

import {
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import {
  DonutChartLabels,
  DonutChartActiveShape,
} from 'components';

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
  '#EF8B2C',
];

const propTypes = {
  colors: PropTypes.array,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const defaultProps = {
  colors: defaultColors,
};

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
  }

  onPieLeave() {
    this.setState({ activeIndex: null });
  }

  render() {
    const {
      colors,
      data,
    } = this.props;

    return (
      <PieChart
        className="DonutChart"
        width={250}
        height={250}
        onMouseLeave={this.onPieLeave}
        onMouseEnter={this.onPieEnter}
      >
        <Pie
          className="DonutChart__chart"
          data={data}
          activeIndex={this.state.activeIndex}
          activeShape={DonutChartActiveShape}
          cx={125}
          cy={125}
          labelLine={false}
          label={DonutChartLabels}
          outerRadius={90}
          innerRadius={55}
          startAngle={90}
          endAngle={-270}
          fill={colors[0]}
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell
              className="DonutChart__sector"
              key={index}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>
      </PieChart>
    );
  }
}

DonutChart.propTypes = propTypes;
DonutChart.defaultProps = defaultProps;

export default DonutChart;
