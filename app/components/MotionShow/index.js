import './motionShow.scss';
import React, { PropTypes } from 'react';
import { Heading, Box, Columns, Argument, VoteData } from '../';

function MotionShow({ motion }) {
  const pro = motion.arguments.filter(e => e.side === 'pro');
  const con = motion.arguments.filter(e => e.side === 'con');

  const buttons = [{
    label: 'Ik ben voor',
    icon: 'thumbs-up',
    action() {
      console.log('Ik ben voor:', motion.title);
    },
  }, {
    label: 'Neutraal',
    icon: 'pause',
    action() {
      console.log('Ik ben neutraal:', motion.title);
    },
  }, {
    label: 'Ik ben tegen',
    icon: 'thumbs-down',
    action() {
      console.log('Ik ben tegen:', motion.title);
    },
  }];

  return (
    <div>
      <Box buttons={buttons}>
        <Heading size="2">{motion.title}</Heading>
        <div>{motion.description}</div>
      </Box>

      <VoteData data={motion.votes} expanded />

      <Columns>
        <div>
          <Heading size="4">Voordelen</Heading>
          {pro.map(a => <Argument key={a.id} data={a} />)}
        </div>
        <div>
          <Heading size="4">Nadelen</Heading>
          {con.map(a => <Argument key={a.id} data={a} />)}
        </div>
      </Columns>
    </div>
  );
}

MotionShow.propTypes = {
  motion: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    votes: PropTypes.object,
    arguments: PropTypes.array,
  }),
};

MotionShow.defaultProps = {
  motion: {
    title: 'Laden...',
  },
};

export default MotionShow;
