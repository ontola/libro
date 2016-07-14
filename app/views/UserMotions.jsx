// @flow
import React, { PropTypes } from 'react';
import { Box, Container } from '../components';

const propTypes = {
};

const defaultProps = {
};

const UserMotions = () => (
  <Container>
    <Box>
      <ul>
        <li>Motie 1</li>
        <li>Motie 2</li>
        <li>Motie 3</li>
        <li>Motie 4</li>
        <li>Motie 5</li>
        <li>Motie 6</li>
      </ul>
    </Box>
  </Container>
);

UserMotions.PropTypes = propTypes;
UserMotions.defaultProps = defaultProps;

export default UserMotions;
