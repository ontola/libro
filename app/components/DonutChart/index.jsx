import c3 from 'c3';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './DonutChart.scss';

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
  /** Array of colors. Renders each item in the color of the same array position */
  colors: PropTypes.arrayOf(PropTypes.string),
  /** Accepts an array of objects with a 'name' string and a 'value' integer */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** The name of the thing that is being counted (plural) */
  unit: PropTypes.string.isRequired,
};

const defaultProps = {
  colors: defaultColors,
};

const renderTooltip = unit => d => `<div class="DonutChart__label">${d[0].name} ${d[0].value} ${unit} (${(d[0].ratio * 100).toFixed(1)}%)</div>`;

class DonutChart extends Component {
  componentDidMount() {
    this.renderChart();
  }

  renderChart() {
    const { colors, data, unit } = this.props;

    return c3.generate({
      bindto: this.wrapper,
      color: {
        pattern: colors,
      },
      data: {
        columns: data.map(item => [item.name, item.value]),
        type: 'donut',
      },
      donut: {
        label: {
          format: (value, ratio, id) => id,
        },
      },
      legend: {
        show: false,
      },
      tooltip: {
        contents: renderTooltip(unit),
      },
    });
  }

  render() {
    return (
      <div
        className="DonutChart"
        ref={(wrapper) => { this.wrapper = wrapper; }}
      />
    );
  }
}

DonutChart.propTypes = propTypes;
DonutChart.defaultProps = defaultProps;

export default DonutChart;
