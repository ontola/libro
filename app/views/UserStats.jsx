// @flow
import React, { PropTypes } from 'react';
import { Box, Container } from '../components';

const propTypes = {
  params: PropTypes.shape({
    motionId: PropTypes.number,
  }),
};

const defaultProps = {
  params: {
    motionId: 0,
  },
};

const UserStats = () => (
  <Container>
    <Box>
      Statistiekenoverzicht
    </Box>
  </Container>
);

UserStats.PropTypes = propTypes;
UserStats.defaultProps = defaultProps;

export default UserStats;
