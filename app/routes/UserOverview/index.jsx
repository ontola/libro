import React from 'react';
import { Link } from 'react-router';

import MotionContainer from 'containers/MotionContainer';
import {
  CardContent,
  CardRow,
  Container,
  CompareVotesBar,
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

const tags = [
  {
    label: 'defensie',
    percentage: 85,
    link: '',
  },
  {
    label: 'onderwijs',
    percentage: 77,
    link: '',
  },
  {
    label: 'milieu',
    percentage: 62,
    link: '',
  },
  {
    label: 'immigratie',
    percentage: 55,
    link: '',
  },
  {
    label: 'economie',
    percentage: 45,
    link: '',
  },
  {
    label: 'abortus',
    percentage: 35,
    link: '',
  },
  {
    label: 'religie',
    percentage: 20,
    link: '',
  },
];

const UserOverview = () => (
  <Container>
    <Widget title="Laatste moties">
      {motions.map(id => <MotionContainer key={id} motionId={id} renderItem={MotionListItem} />)}
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
      title="Gelijkenis"
      description="Berekend met het stemgedrag van de partijleden op moties.
      Klik op een partij om te zien waarover ze verschillend stemden."
    >
      <CompareVotesBar
        label="GroenLinks"
        mainPercentage={80}
        compareAllLink=""
        tags={tags}
      />
      <CompareVotesBar
        label="PvdA"
        mainPercentage={72}
        compareAllLink=""
        tags={tags}
      />
      <CompareVotesBar
        label="VVD"
        mainPercentage={55}
        compareAllLink=""
        tags={tags}
      />
      <CompareVotesBar
        label="CDA"
        mainPercentage={25}
        compareAllLink=""
        tags={tags}
      />
    </Widget>
    <Widget
      title="Thema focus"
      description="Deze onderwerpen kwamen relatief vaak voor in de moties van dit persoon."
    >
      <Link to="/"><Tag suffix="56%">Defensie</Tag></Link>
      <Link to="/"><Tag suffix="24%">Cultuur</Tag></Link>
    </Widget>
  </Container>
);

export default UserOverview;
