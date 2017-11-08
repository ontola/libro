import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import PersonContainer from 'containers/PersonContainer';
import { getPersonName } from 'state/persons/selectors';

import path from 'helpers/paths';

import {
  BackButton,
  Container,
  Cover,
  LinkList,
  ProfileCard,
} from 'components';

const propTypes = {
  params: PropTypes.shape({
    userId: PropTypes.number,
  }),
  children: PropTypes.node,
  name: PropTypes.string,
};

const links = id => ([{
  label: 'Overzicht',
  to: path.profile(id),
}, {
  label: 'Voorstellen',
  to: path.profileMotions(id),
}, {
  label: 'Info',
  to: path.profileAbout(id),
}]);

const profileCardRender = (data, full, similarity) => (
  <ProfileCard
    bio={data.biography}
    full={full}
    id={data.id}
    image={data.image}
    name={data.name}
    party={data.party}
    similarity={similarity}
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
        <BackButton link={path.politiciansIndex()}>Terug naar alle politici</BackButton>
        <PersonContainer
          full
          renderItem={profileCardRender}
          user={params.userId}
        />
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

export default connect((state, ownProps) => ({
  name: getPersonName(state, ownProps),
}))(Profile);
