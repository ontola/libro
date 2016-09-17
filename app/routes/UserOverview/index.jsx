import React from 'react';
import {
  Card,
  CardContent,
  CardRow,
  Container,
  LabelValue,
  MotionListItem,
  Widget,
} from 'components';
import MotionContainer from 'containers/MotionContainer';
import { Link } from 'react-router';

const motions = ['245245', '987654', '642621', '136743', '334672'];

const UserMotions = () => (
  <Container>
    <Widget title="Laatste moties">
      {motions.map(id => <MotionContainer key={id} motionId={id} renderItem={MotionListItem} />)}
    </Widget>
    <Widget title="Statistieken">
      <Card>
        <Link to="">
          <CardRow showArrow>
            <CardContent>
              <LabelValue label="Ingediende moties" value="53" />
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
      </Card>
    </Widget>
  </Container>
);

export default UserMotions;
