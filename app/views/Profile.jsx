// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { Container, Cover, LinkList } from '../components';
import ProfileCardContainer from '../containers/ProfileCardContainer';

const propTypes = {
  params: PropTypes.object,
  children: PropTypes.node,
  name: PropTypes.string,
};

const links = id => ([
  {
    label: 'Ideëen',
    to: `/profile/${id}`,
  },
  {
    label: 'Statistieken',
    to: `/profile/${id}/stats`,
  },
  {
    label: 'Activiteit',
    to: `/profile/${id}/activity`,
  },
  {
    label: 'Bio',
    to: `/profile/${id}/bio`,
  },
  {
    label: 'Groepen',
    to: `/profile/${id}/groups`,
  },
]);

const Profile = ({ params, children, name }) => (
  <div>
    <Helmet title={`Profiel van ${name}`} />
    <Cover>
      <Container>
        <ProfileCardContainer user={params.userId} full />
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

const stateToProps = (state, ownProps) => ({
  name: state.getIn(['persons', 'items', ownProps.params.userId, 'name']),
});

export default connect(stateToProps)(Profile);
