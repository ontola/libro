import React from 'react';
import {
  CardContent,
  CardRow,
  Container,
  LabelValue,
  LabelValueBar,
  MotionListItem,
  Tag,
  Widget,
} from 'components';
import MotionContainer from 'containers/MotionContainer';
import { Link } from 'react-router';

const motions = ['245245', '987654', '642621', '136743', '334672'];

const UserOverview = () => (
  <Container>
    <Widget title="Laatste moties">
      {motions.map(id => <MotionContainer key={id} motionId={id} renderItem={MotionListItem} />)}
    </Widget>
    <Widget title="Statistieken">
      <Link to="">
        <CardRow showArrow>
          <CardContent>
            <LabelValue label="Meest ingediende moties" value="#5" />
          </CardContent>
        </CardRow>
      </Link>
      <Link to="">
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
      <Link to="">
        <CardRow>
          <CardContent>
            <LabelValueBar label="PvdA" value="65" />
          </CardContent>
        </CardRow>
      </Link>
      <Link to="">
        <CardRow>
          <CardContent>
            <LabelValueBar label="VVD" value="46" />
          </CardContent>
        </CardRow>
      </Link>
      <Link to="">
        <CardRow>
          <CardContent>
            <LabelValueBar label="CDA" value="31" />
          </CardContent>
        </CardRow>
      </Link>
    </Widget>
    <Widget
      title="Thema's"
      description="Deze onderwerpen kwamen relatief vaak voor in de moties van dit persoon."
    >
      <Link to="">
        <Tag>
          Defensie
        </Tag>
      </Link>
    </Widget>
  </Container>
);

export default UserOverview;
