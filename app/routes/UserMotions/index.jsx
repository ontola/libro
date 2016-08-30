import React from 'react';
import { Box, Container } from 'components';
import MotionContainer from 'containers/MotionContainer';

const motions = ['245245', '987654', '642621', '136743', '334672'];

const defaultButtons = (id, voteAction) => [{
  icon: 'thumbs-up',
  label: 'Ik ben voor',
  side: 'pro',
  action: () => {
    voteAction({
      motionId: id,
      side: 'pro',
    });
  },
}, {
  icon: 'pause',
  label: 'Neutraal',
  side: 'neutral',
  action: () => {
    voteAction({
      motionId: id,
      side: 'neutral',
    });
  },
}, {
  icon: 'thumbs-down',
  label: 'Ik ben tegen',
  side: 'con',
  action: () => {
    voteAction({
      motionId: id,
      side: 'con',
    });
  },
}];

const renderMotion = (data, vote, voteData) => (
  <Box
    title={data.title}
    headingSize="3"
    link={`/motions/${data.id}`}
    author={data.creator}
    date={data.createdAt}
    boxActions={defaultButtons(data.id, vote)}
    voteData={voteData}
  />
);

const UserMotions = () => (
  <Container>
    {motions.map(id => <MotionContainer key={id} motionId={id} renderItem={renderMotion} />)}
  </Container>
);

export default UserMotions;
