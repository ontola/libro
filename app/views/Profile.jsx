// @flow
import React, { PropTypes } from 'react';
import { Navigation } from '../components';
import ProfileCardContainer from '../containers/ProfileCardContainer';

const propTypes = {
  params: PropTypes.object,
  children: PropTypes.node,
};

const Profile = (props) => {
  const links = [
    {
      label: 'Ideëen',
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
    {
      label: 'Yoloswagness',
      to: `/profile/${props.params.userId}/yolo`,
    },
  ];

  return (
    <div>
      <ProfileCardContainer user={props.params.userId} full />
      <Navigation links={links} fullWidth />
      {props.children}
    </div>
  );
};

Profile.propTypes = propTypes;

export default Profile;
