import './votedata.scss';
import React, { PropTypes } from 'react';
import { Heading, Box } from '../';

function VoteData({ data, expanded }) {
  return (
    <Box>
      <Heading size="4">Opinions</Heading>
      <div>Hier komen opinions..</div>
    </Box>
  );
}

VoteData.propTypes = {
  data: PropTypes.array.isRequired,
  expanded: PropTypes.bool.isRequired,
};

VoteData.defaultProps = {
  data: [],
  expanded: false,
};

export default VoteData;
