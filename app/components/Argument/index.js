import './argument.scss';
import React, { PropTypes } from 'react';
import { Heading, Box } from '../';

function Argument({ data }) {
  const buttons = [{
    label: 'Reageer',
    icon: 'comment',
    action() {
      console.log('Reactie op:', data.title);
    },
  }, {
    label: 'Upvote',
    icon: 'arrow-up',
    action() {
      console.log('Upvote voor:', data.title);
    },
  }];

  return (
    <Box buttons={buttons}>
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
