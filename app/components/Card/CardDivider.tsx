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

const textStyle = {
  backgroundColor: 'rgb(255,255,255)',
  color: 'rgb(100,100,100)',
  fontWeight: 'bold',
  padding: '0 7px',
  zIndex: 1,
};

/**
 * A fine grey line with an optional text in its center
 * @returns {component} Component
 */
const CardDivider: React.FC<PropTypes> = ({
  lineColor,
  text,
  margin,
}) => {
  const style = React.useMemo(() => ({
    backgroundColor: lineColor,
    marginBottom: (margin ? '1em' : undefined),
  }), [lineColor, margin]);

  return (
    <div
      className="CardDivider"
      style={style as any}
    >
      {text && (
        <span style={textStyle as any}>
      {text}
    </span>
      )}
    </div>
  );
};

CardDivider.defaultProps = defaultProps;

export default CardDivider;
