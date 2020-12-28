import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../shared/config';

interface PropTypes {
  lineColor?: string;
  margin?: boolean;
  text?: React.ReactNode;
}

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
}: PropTypes) => (
  <div
    className="CardDivider"
    style={{
      backgroundColor: lineColor,
      marginBottom: (margin ? '1em' : undefined),
    }}
  >
    {text && (
    <span
      style={{
        backgroundColor: 'rgb(255,255,255)',
        color: 'rgb(100,100,100)',
        fontWeight: 'bold',
        padding: '0 7px',
        zIndex: 1,
      }}
    >
      {text}
    </span>
    )}
  </div>
);

CardDivider.defaultProps = defaultProps;

export default CardDivider;
