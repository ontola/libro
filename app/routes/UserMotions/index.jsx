import React from 'react';
import { Container, MotionSmallItem } from 'components';
import MotionContainer from 'containers/MotionContainer';

const motions = ['245245', '987654', '642621', '136743', '334672'];

const UserMotions = () => (
  <Container>
    {motions.map(id => <MotionContainer key={id} motionId={id} renderItem={MotionSmallItem} />)}
  </Container>
);

export default UserMotions;
