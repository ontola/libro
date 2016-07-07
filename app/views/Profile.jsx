// @flow
import React, { PropTypes } from 'react';
import { Heading, Box, Page } from '../components';

const propTypes = {
  params: PropTypes.object,
};

const Profile = (props) => (
  <Page>
    <Heading>Profile</Heading>
    <Box>
      <div className="Box__content">{props.params.userId}</div>
    </Box>
  </Page>
);

Profile.propTypes = propTypes;

export default Profile;
