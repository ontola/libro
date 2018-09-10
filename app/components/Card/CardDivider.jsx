import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../shared/config';

const propTypes = {
  lineColor: PropTypes.string,
  // Adds margin below the line
  margin: PropTypes.bool,
  // Component adds a white padding to the text to make it stand out from the line.
  text: PropTypes.node,
};

const defaultProps = {
  lineColor: colors.grey['x-light'],
};

/**
 * A fine grey line with an optional text in its center
 * @returns {component} Component
 */
const CardDivider = ({
  lineColor,
  text,
  margin,
}) => (
  <div
    className="CardDivider"
    style={{
      backgroundColor: lineColor,
      marginBottom: (margin && '1em'),
    }}
  >
    {text && (
    <span
      style={{
        backgroundColor: 'rgb(255,255,255)',
        color: 'rgb(100,100,100)',
        fontWeight: 'bold',
        padding: '0 7px',
        zIndex: '1',
      }}
    >
      {text}
    </span>
    )}
  </div>
);

CardDivider.defaultProps = defaultProps;
CardDivider.propTypes = propTypes;

export default CardDivider;
