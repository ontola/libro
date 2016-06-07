import './argument.scss';
import React, { PropTypes } from 'react';
import { Heading, Box } from '../';

function Argument({ data }) {
  return (
    <Box type="argument">
      <Heading size="3">{data.title}</Heading>
      <div>{data.text}</div>
    </Box>
  );
}

Argument.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};

Argument.defaultProps = {
  data: {
    title: 'Loading...',
    text: '...',
  },
};

export default Argument;
