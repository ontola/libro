/* eslint max-len: 0 */
import React from 'react';
import Helmet from 'react-helmet';

import path from 'helpers/paths';
import {
  Container,
  Header,
  List,
  ProfileListItem,
} from 'components';

const partiesIndex = [
  {
    id: '1', image: '/static/logos/vvd.png', link: path.party('1'), members: 40, name: 'VVD'
  },
  {
    id: '2', image: '/static/logos/pvda.png', link: path.party('2'), members: 36, name: 'PvdA'
  },
  {
    id: '3', image: '/static/logos/sp.png', link: path.party('3'), members: 15, name: 'SP'
  },
  {
    id: '4', image: '/static/logos/cda.png', link: path.party('4'), members: 13, name: 'CDA'
  },
  {
    id: '5', image: '/static/logos/pvv.png', link: path.party('5'), members: 12, name: 'PVV'
  },
  {
    id: '6', image: '/static/logos/d66.png', link: path.party('6'), members: 12, name: 'D66'
  },
  {
    id: '7', image: '/static/logos/cu.png', link: path.party('7'), members: 5, name: 'CU'
  },
  {
    id: '8', image: '/static/logos/groenlinks.png', link: path.party('8'), members: 4, name: 'GroenLinks'
  },
  {
    id: '9', image: '/static/logos/sgp.png', link: path.party('9'), members: 3, name: 'SGP'
  },
  {
    id: '10', image: '/static/logos/pvdd.png', link: path.party('10'), members: 2, name: 'PvdD'
  },
  {
    id: '11', image: '/static/logos/50plus.png', link: path.party('11'), members: 1, name: '50PLUS'
  },
  {
    id: '12', image: '/static/logos/grko.png', link: path.party('12'), members: 2, name: 'GrKÖ'
  },
  {
    id: '13', image: '/static/logos/grbvk.png', link: path.party('13'), members: 2, name: 'GrBvK'
  },
  {
    id: '14', image: '/static/logos/houwers.png', link: path.party('14'), members: 1, name: 'Houwers'
  },
  {
    id: '15', image: '/static/logos/klein.png', link: path.party('15'), members: 1, name: 'Klein'
  },
  {
    id: '16', image: '/static/logos/vanvliet.png', link: path.party('16'), members: 1, name: 'Van Vliet'
  },
];

const renderParty = party => (
  <ProfileListItem
    id={party.id}
    image={party.image}
    key={party.id}
    link={party.link}
    name={party.name}
  />
);

const Parties = () => (
  <div>
    <Helmet title="Partijen" />
    <Header />
    <Container>
      <List align="horizontal" items={partiesIndex} renderItem={renderParty} />
    </Container>
  </div>
);

export default Parties;
