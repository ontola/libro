import './DonutChart.scss';
import React, { Component, PropTypes } from 'react';
import c3 from 'c3';

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

const renderTooltip = d => (
  `<div class="DonutChart__label">${d[0].value} zetels (${(d[0].ratio * 100).toFixed(1)}%)</div>`
);

const propTypes = {
  colors: PropTypes.array,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const defaultProps = {
  colors: defaultColors,
};

class DonutChart extends Component {
  componentDidMount() {
    this.renderChart();
  }

  renderChart() {
    const { colors, data } = this.props;

    return c3.generate({
      bindto: this.wrapper,
      data: {
        columns: data.map(item => [item.name, item.value]),
        type: 'donut',
      },
      color: {
        pattern: colors,
      },
      legend: {
        show: false,
      },
      tooltip: {
        contents: renderTooltip,
      },
      donut: {
        label: {
          format: (value, ratio, id) => id,
        },
      },
    });
  }

  render() {
    return (
      <div
        ref={wrapper => (this.wrapper = wrapper)}
        className="DonutChart"
      />
    );
  }
}

DonutChart.propTypes = propTypes;
DonutChart.defaultProps = defaultProps;

export default DonutChart;
