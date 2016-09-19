import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import {
  CardContent,
  CardRow,
  Columns,
  Container,
  DonutChart,
  Header,
  LabelValueBar,
  LabelValue,
  MotionListItem,
  Widget,
} from 'components';

import MotionContainer from 'containers/MotionContainer';

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

const genderData = [
  { name: 'Man', value: 102 },
  { name: 'Vrouw', value: 48 },
];

const motionsPerUser = [
  { name: 'Wouter Koolmees', value: '135' },
  { name: 'Agnes Mulder', value: '132' },
  { name: 'Ronald van Raak', value: '98' },
  { name: 'Pieter Duisenberg', value: '95' },
  { name: 'Barry Madlener', value: '88' },
  { name: 'Harry van Bommel', value: '76' },
  { name: 'Manon Fokke', value: '74' },
];

const motions = ['245245', '987654', '642621'];

const Home = () => (
  <div>
    <Header />
    <Helmet title="Tweede Kamer Open Data" />

    <Container>
      <Widget title="Laatste moties">
        {motions.map(id => <MotionContainer key={id} motionId={id} renderItem={MotionListItem} />)}
      </Widget>

      <Widget title="Statistieken">
        <Link to="/parties">
          <CardRow showArrow>
            <CardContent>
              <LabelValue label="Partijen" value="16" />
            </CardContent>
          </CardRow>
        </Link>
        <Link to="/politicians">
          <CardRow showArrow>
            <CardContent>
              <LabelValue label="Kamerleden" value="150" />
            </CardContent>
          </CardRow>
        </Link>
        <Link to="/motions">
          <CardRow showArrow>
            <CardContent>
              <LabelValue label="Moties ingediend" value="1.430" />
            </CardContent>
          </CardRow>
        </Link>
        <Link to="/motions?filter=aangenomen">
          <CardRow showArrow>
            <CardContent>
              <LabelValue label="Moties aangenomen" value="52%" />
            </CardContent>
          </CardRow>
        </Link>
      </Widget>

      <Columns>
        <Widget title="Kamerverdeling">
          <CardContent>
            <DonutChart data={parties} />
          </CardContent>
        </Widget>
        <Widget title="Man/vrouw verhouding">
          <CardContent>
            <DonutChart data={genderData} />
          </CardContent>
        </Widget>
      </Columns>

      <Widget
        title="Ranglijst aantal moties"
        description="Gebaseerd op moties van de afgelopen 6 maanden."
      >
        {motionsPerUser.map(user => (
          <Link key={user.name} to="/">
            <CardRow>
              <CardContent>
                <LabelValueBar label={user.name} value={user.value} />
              </CardContent>
            </CardRow>
          </Link>
        ))}
      </Widget>
    </Container>
  </div>
);

export default Home;
