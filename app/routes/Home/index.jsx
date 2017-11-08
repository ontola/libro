import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';


import {
  CardContent,
  CardRow,
  Container,
  DonutChart,
  EventListItem,
  Header,
  LabelValue,
  LabelValueBar,
  MotionListItem,
  Widget,
} from 'components';
import MotionContainer from 'containers/MotionContainer';
import EventContainer from 'containers/EventContainer';
import path from 'helpers/paths';

const parties = [
  { link: path.party('1'), name: 'VVD', value: 40 },
  { link: path.party('2'), name: 'PvdA', value: 36 },
  { link: path.party('3'), name: 'SP', value: 15 },
  { link: path.party('4'), name: 'CDA', value: 13 },
  { link: path.party('5'), name: 'PVV', value: 12 },
  { link: path.party('6'), name: 'D66', value: 12 },
  { link: path.party('7'), name: 'CU', value: 5 },
  { link: path.party('8'), name: 'GroenLinks', value: 4 },
  { link: path.party('9'), name: 'SGP', value: 3 },
  { link: path.party('10'), name: 'PvdD', value: 2 },
  { link: path.party('11'), name: '50PLUS', value: 1 },
  { link: path.party('12'), name: 'GrKÖ', value: 2 },
  { link: path.party('13'), name: 'GrBvK', value: 2 },
  { link: path.party('14'), name: 'Houwers', value: 1 },
  { link: path.party('15'), name: 'Klein', value: 1 },
  { link: path.party('16'), name: 'Van Vliet', value: 1 },
];

const genderData = [
  { name: 'Man', value: 102 },
  { name: 'Vrouw', value: 48 },
];

const motionsPerUser = [
  { name: 'Wouter Koolmees', value: 135 },
  { name: 'Agnes Mulder', value: 132 },
  { name: 'Ronald van Raak', value: 98 },
  { name: 'Pieter Duisenberg', value: 95 },
  { name: 'Barry Madlener', value: 88 },
  { name: 'Harry van Bommel', value: 76 },
  { name: 'Manon Fokke', value: 74 },
];

const motions = [
  '6117dd10-2cf8-e511-9672-e4115babb880',
  'c0e2a617-79f2-e511-9672-e4115babb880',
  '3137bf58-89f5-e511-9672-e4115babb880',
];

const events = [
  'c772f3d1-76bf-e511-96bc-e4115babb880',
  'ce872c1a-80ca-e511-96bc-e4115babb880',
];

const Home = () => (
  <div>
    <Header />
    <Helmet title="Tweede Kamer Open Data" />
    <Container>
      <Widget title="Moties" to={path.motionsIndex()} >
        {motions.map(id => <MotionContainer key={id} motionId={id} renderItem={MotionListItem} />)}
      </Widget>
      <Widget title="Vergaderingen" >
        {events.map(id => <EventContainer id={id} key={id} renderItem={EventListItem} />)}
      </Widget>
      <Widget title="Statistieken">
        <Link to={path.partiesIndex()}>
          <CardRow showArrow>
            <CardContent>
              <LabelValue label="Partijen" value="16" />
            </CardContent>
          </CardRow>
        </Link>
        <Link to={path.politiciansIndex()}>
          <CardRow showArrow>
            <CardContent>
              <LabelValue label="Kamerleden" value="150" />
            </CardContent>
          </CardRow>
        </Link>
        <Link to={path.motionsIndex()}>
          <CardRow showArrow>
            <CardContent>
              <LabelValue label="Moties ingediend" value="1.430" />
            </CardContent>
          </CardRow>
        </Link>
        <Link to={path.motionsIndex()}>
          <CardRow showArrow>
            <CardContent>
              <LabelValue label="Moties aangenomen" value="52%" />
            </CardContent>
          </CardRow>
        </Link>
      </Widget>
      <Widget title="Partijen" to={path.partiesIndex()}>
        <CardContent>
          <DonutChart data={parties} unit="zetels" />
        </CardContent>
      </Widget>
      <Widget title="Man/vrouw verhouding">
        <CardContent>
          <DonutChart data={genderData} unit="zetels" />
        </CardContent>
      </Widget>
      <Widget
        description="Gebaseerd op moties van de afgelopen 6 maanden."
        title="Ranglijst aantal moties"
      >
        {motionsPerUser.map(user => (
          <Link key={user.name} to="/">
            <LabelValueBar
              label={user.name}
              value={user.value}
            />
          </Link>
        ))}
      </Widget>
    </Container>
  </div>
);

export default Home;
