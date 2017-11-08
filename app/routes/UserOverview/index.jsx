import React from 'react';
import { Link } from 'react-router';

import MotionContainer from 'containers/MotionContainer';
import {
  CardContent,
  CardRow,
  CompareVotesBar,
  Container,
  LabelValue,
  MotionListItem,
  Tag,
  Widget,
} from 'components';

const motions = [
  '6117dd10-2cf8-e511-9672-e4115babb880',
  '169b7429-14f8-e511-9672-e4115babb880',
  '2ea244f5-14f8-e511-9672-e4115babb880',
];

const tags = [{
  label: 'defensie',
  link: '',
  percentage: 85,
}, {
  label: 'onderwijs',
  link: '',
  percentage: 77,
}, {
  label: 'milieu',
  link: '',
  percentage: 62,
}, {
  label: 'immigratie',
  link: '',
  percentage: 55,
}, {
  label: 'economie',
  link: '',
  percentage: 45,
}, {
  label: 'abortus',
  link: '',
  percentage: 35,
}, {
  label: 'religie',
  link: '',
  percentage: 20,
}];

const UserOverview = () => (
  <Container>
    <Widget title="Laatste moties">
      {motions.map(id => (
        <MotionContainer
          key={id}
          motionId={id}
          renderItem={MotionListItem}
        />
      ))}
    </Widget>
    <Widget title="Statistieken">
      <Link to="/">
        <CardRow showArrow>
          <CardContent>
            <LabelValue label="Meest ingediende moties" value="#5" />
          </CardContent>
        </CardRow>
      </Link>
      <Link to="/">
        <CardRow showArrow>
          <CardContent>
            <LabelValue label="Percentage moties aangenomen" value="46%" />
          </CardContent>
        </CardRow>
      </Link>
    </Widget>
    <Widget
      description="Berekend met het stemgedrag van de partijleden op moties.
      Klik op een partij om te zien waarover ze verschillend stemden."
      title="Gelijkenis"
    >
      <CompareVotesBar
        compareAllLink=""
        label="GroenLinks"
        mainPercentage={80}
        tags={tags}
      />
      <CompareVotesBar
        compareAllLink=""
        label="PvdA"
        mainPercentage={72}
        tags={tags}
      />
      <CompareVotesBar
        compareAllLink=""
        label="VVD"
        mainPercentage={55}
        tags={tags}
      />
      <CompareVotesBar
        compareAllLink=""
        label="CDA"
        mainPercentage={25}
        tags={tags}
      />
    </Widget>
    <Widget
      description="Deze onderwerpen kwamen relatief vaak voor in de moties van dit persoon."
      title="Thema focus"
    >
      <Link to="/"><Tag suffix="56%">Defensie</Tag></Link>
      <Link to="/"><Tag suffix="24%">Cultuur</Tag></Link>
    </Widget>
  </Container>
);

export default UserOverview;
