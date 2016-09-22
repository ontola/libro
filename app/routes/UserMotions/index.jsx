import React from 'react';
import { Container, MotionSmallItem } from 'components';
import MotionContainer from 'containers/MotionContainer';

const motions = [
  '6117dd10-2cf8-e511-9672-e4115babb880',
  '169b7429-14f8-e511-9672-e4115babb880',
  '2ea244f5-14f8-e511-9672-e4115babb880',
  '6717dd10-2cf8-e511-9672-e4115babb880',
  'c0e2a617-79f2-e511-9672-e4115babb880',
  '3137bf58-89f5-e511-9672-e4115babb880',
];

const UserMotions = () => (
  <Container>
    {motions.map(id => (
      <MotionContainer
        key={id}
        motionId={id}
        renderItem={MotionSmallItem}
      />
    ))}
  </Container>
);

export default UserMotions;
