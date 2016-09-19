/* eslint max-len: 0 */
import React from 'react';
import Helmet from 'react-helmet';

import {
  Container,
  Header,
  List,
  ProfileListItem,
} from 'components';

const partiesList = [
  { id: '1', name: 'VVD', members: 40, image: '/static/logos/vvd.png', link: '/parties/1' },
  { id: '2', name: 'PvdA', members: 36, image: '/static/logos/pvda.png', link: '/parties/2' },
  { id: '3', name: 'SP', members: 15, image: '/static/logos/sp.png', link: '/parties/3' },
  { id: '4', name: 'CDA', members: 13, image: '/static/logos/cda.png', link: '/parties/4' },
  { id: '5', name: 'PVV', members: 12, image: '/static/logos/pvv.png', link: '/parties/5' },
  { id: '6', name: 'D66', members: 12, image: '/static/logos/d66.png', link: '/parties/6' },
  { id: '7', name: 'CU', members: 5, image: '/static/logos/cu.png', link: '/parties/7' },
  { id: '8', name: 'GroenLinks', members: 4, image: '/static/logos/groenlinks.png', link: '/parties/8' },
  { id: '9', name: 'SGP', members: 3, image: '/static/logos/sgp.png', link: '/parties/9' },
  { id: '10', name: 'PvdD', members: 2, image: '/static/logos/pvdd.png', link: '/parties/10' },
  { id: '11', name: '50PLUS', members: 1, image: '/static/logos/50plus.png', link: '/parties/11' },
  { id: '12', name: 'GrKÖ', members: 2, image: '/static/logos/grko.png', link: '/parties/12' },
  { id: '13', name: 'GrBvK', members: 2, image: '/static/logos/grbvk.png', link: '/parties/13' },
  { id: '14', name: 'Houwers', members: 1, image: '/static/logos/houwers.png', link: '/parties/14' },
  { id: '15', name: 'Klein', members: 1, image: '/static/logos/klein.png', link: '/parties/15' },
  { id: '16', name: 'Van Vliet', members: 1, image: '/static/logos/vanvliet.png', link: '/parties/16' },
];

const renderParty = (party) => (
  <ProfileListItem
    key={party.id}
    id={party.id}
    link={party.link}
    image={party.image}
    name={`${party.name} (${party.members})`}
  />
);

const Parties = () => (
  <div>
    <Helmet title="Partijen" />
    <Header />
    <Container>
      <List items={partiesList} renderItem={renderParty} align="horizontal" />
    </Container>
  </div>
);

export default Parties;
