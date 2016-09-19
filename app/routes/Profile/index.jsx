import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import PersonContainer from 'containers/PersonContainer';
import { getPersonName } from 'state/persons/selectors';

import {
  BackButton,
  Container,
  Cover,
  LinkList,
  ProfileCard,
} from 'components';

const propTypes = {
  params: PropTypes.object,
  children: PropTypes.node,
  name: PropTypes.string,
};

const links = id => ([{
  label: 'Overzicht',
  to: `/profile/${id}`,
}, {
  label: 'Voorstellen',
  to: `/profile/${id}/motions`,
}, {
  label: 'Info',
  to: `/profile/${id}/about`,
}]);

const profileCardRender = (data, url, full) => (
  <ProfileCard
    id={data.id}
    name={data.name}
    party={data.party}
    image={data.image}
    bio={data.biography}
    full={full}
  />
);

const Profile = ({
  params,
  children,
  name,
}) => (
  <div>
    <Helmet title={`Profiel van ${name}`} />
    <Cover type="light">
      <Container>
        <BackButton link="/politicians">Terug naar alle politici</BackButton>
        <PersonContainer user={params.userId} renderItem={profileCardRender} full />
      </Container>
    </Cover>

    <Cover type="lighter">
      <Container>
        <LinkList links={links(params.userId)} fullWidth />
      </Container>
    </Cover>

    {children}
  </div>
);

Profile.propTypes = propTypes;

export default connect(
  (state, ownProps) => ({
    name: getPersonName(state, ownProps),
  })
)(Profile);
