import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

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
};

const links = id => ([
  { label: 'Overzicht', to: `/parties/${id}` },
  { label: 'Voorstellen', to: `/parties/${id}/motions` },
  { label: 'Leden', to: `/parties/${id}/members` },
  { label: 'Info', to: `/parties/${id}/about` },
]);

const Party = ({
  params,
  children,
}) => (
  <div>
    <Helmet title="Profiel van D66" />
    <Cover type="light">
      <Container>
        <BackButton link="/parties">Terug naar alle partijen</BackButton>
        <ProfileCard
          id={params.partyId}
          name="D66"
          image="/static/logos/d66.png"
          bio="Samen sterker - kansen voor iedereen"
          full
        />
      </Container>
    </Cover>

    <Cover type="lighter">
      <Container>
        <LinkList links={links(params.partyId)} fullWidth />
      </Container>
    </Cover>

    {children}
  </div>
);

Party.propTypes = propTypes;

export default Party;
