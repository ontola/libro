import React from 'react';
import Helmet from 'react-helmet';

import {
  CardContent,
  Container,
  DonutChart,
  Widget,
} from 'components';

const parties = [
	{ name: 'VVD', value: 40, link: '/party/vdd' },
  { name: 'PvdA', value: 36 },
  { name: 'SP', value: 15 },
  { name: 'CDA', value: 13 },
  { name: 'PVV', value: 12 },
  { name: 'D66', value: 12 },
  { name: 'CU', value: 5 },
  { name: 'GroenLinks', value: 4 },
  { name: 'SGP', value: 3 },
  { name: 'PvdD', value: 2 },
  { name: '50PLUS', value: 1 },
  { name: 'GrKÖ', value: 2 },
  { name: 'GrBvK', value: 2 },
  { name: 'Houwers', value: 1 },
  { name: 'Klein', value: 1 },
  { name: 'Van Vliet', value: 1 },
];

// const genderData = [
//   { name: 'Man', value: 64 },
//   { name: 'Vrouw', value: 86 },
// ];

const Home = () => (
  <div>
    <Helmet title="Tweede Kamer Open Data" />

    <Container>
      <Widget title="Kamerverdeling">
        <CardContent>
          <DonutChart data={parties} />
        </CardContent>
      </Widget>
    </Container>
  </div>
);

export default Home;
