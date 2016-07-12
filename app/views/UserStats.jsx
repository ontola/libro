// @flow
import React, { PropTypes } from 'react';
import { Box, Page } from '../components';

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
  <Page>
    <Box>
      <div className="Box__content">
        Statistiekenoverzicht
      </div>
    </Box>
  </Page>
);

UserStats.PropTypes = propTypes;
UserStats.defaultProps = defaultProps;

export default UserStats;
