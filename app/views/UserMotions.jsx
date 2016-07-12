// @flow
import React, { PropTypes } from 'react';
import { Box, Page } from '../components';

const propTypes = {
};

const defaultProps = {
};

const UserMotions = () => (
  <Page>
    <Box>
      <div className="Box__content">
        <ul>
          <li>Motie 1</li>
          <li>Motie 2</li>
          <li>Motie 3</li>
          <li>Motie 4</li>
          <li>Motie 5</li>
          <li>Motie 6</li>
        </ul>
      </div>
    </Box>
  </Page>
);

UserMotions.PropTypes = propTypes;
UserMotions.defaultProps = defaultProps;

export default UserMotions;
