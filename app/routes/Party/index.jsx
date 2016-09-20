import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import path from 'helpers/paths';
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

const links = (id) => ([
  { label: 'Overzicht', to: path.party(id) },
  { label: 'Voorstellen', to: path.partyMotions(id) },
  { label: 'Leden', to: path.partyMembers(id) },
  { label: 'Info', to: path.partyAbout(id) },
]);

const Party = ({
  params,
  children,
}) => (
  <div>
    <Helmet title="Profiel van D66" />
    <Cover type="light">
      <Container>
        <BackButton link={path.partiesIndex()}>Terug naar alle partijen</BackButton>
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
