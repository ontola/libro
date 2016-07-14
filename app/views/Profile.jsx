// @flow
import React, { PropTypes } from 'react';
import { Container, Cover, LinkList } from '../components';
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
      <Cover>
        <Container>
          <ProfileCardContainer user={props.params.userId} full />
        </Container>
      </Cover>

      <Cover type="lighter">
        <Container>
          <LinkList links={links} fullWidth />
        </Container>
      </Cover>

      {props.children}
    </div>
  );
};

Profile.propTypes = propTypes;

export default Profile;
