// @flow
import React, { PropTypes } from 'react';
import { Box, Page } from '../components';
import ProfileCardContainer from '../containers/ProfileCardContainer';

const propTypes = {
  params: PropTypes.object,
};

const Profile = (props) => (
  <div>
    <Page type="full">
      <ProfileCardContainer full user={props.params.userId} />
    </Page>
    <Page>
      <Box>
        <div className="Box__content">
          Joe
        </div>
      </Box>
    </Page>
  </div>

);

Profile.propTypes = propTypes;

export default Profile;
