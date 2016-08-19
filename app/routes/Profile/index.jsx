// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { Container, Cover, LinkList, ProfileCard } from 'components';
import PersonContainer from 'containers/PersonContainer';
import { getPersonName } from 'state/persons/selectors';

const propTypes = {
  params: PropTypes.object,
  children: PropTypes.node,
  name: PropTypes.string,
};

const links = id => ([{
  label: 'Ideëen',
  to: `/profile/${id}`,
}, {
  label: 'Statistieken',
  to: `/profile/${id}/stats`,
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
