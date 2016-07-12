// @flow
import React, { PropTypes } from 'react';
import { Navigation, Page } from '../components';
import ProfileCardContainer from '../containers/ProfileCardContainer';

const propTypes = {
  params: PropTypes.object,
  children: PropTypes.node,
};

const Profile = (props) => {
  const links = [
    {
      label: 'Moties ingediend',
      to: `/profile/${props.params.userId}`,
    },
    {
      label: 'Statistieken',
      to: `/profile/${props.params.userId}/stats`,
    },
    {
      label: 'Activiteit',
      to: `/profile/${props.params.userId}/activity`,
    },
    {
      label: 'Bio',
      to: `/profile/${props.params.userId}/bio`,
    },
    {
      label: 'Groepen',
      to: `/profile/${props.params.userId}/groups`,
    },
  ];

  return (
    <div>
      <Page type="full">
        <ProfileCardContainer full user={props.params.userId} />
      </Page>
      <Navigation fullWidth links={links} />
      {props.children}
    </div>
  );
};

Profile.propTypes = propTypes;

export default Profile;
