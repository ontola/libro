import React, { PropTypes } from 'react';

import { colors } from 'components/shared/config';

const propTypes = {
  lineColor: PropTypes.string,
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
}) =>
  (<div
    style={{
      width: '100%',
      height: '1px',
      backgroundColor: lineColor,
      display: 'flex',
      marginBottom: '1em',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {text &&
      <span
        style={{
          backgroundColor: 'rgb(255,255,255)',
          padding: '0 7px',
          fontWeight: 'bold',
          color: 'rgb(100,100,100)',
        }}
      >
        {text}
      </span>}
   </div>);

CardDivider.defaultProps = defaultProps;
CardDivider.propTypes = propTypes;

export default CardDivider;
