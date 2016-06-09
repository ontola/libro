import React, { PropTypes } from 'react';
import { Heading, Box, Columns, Argument, VoteData } from '../';

const propTypes = {
  motion: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    votes: PropTypes.object,
    arguments: PropTypes.array,
  }),
};

const defaultProps = {
  motion: {
    title: 'Laden...',
  },
};

function MotionShow({ motion }) {
  const pro = motion.arguments && motion.arguments.filter(e => e.side === 'pro');
  const con = motion.arguments && motion.arguments.filter(e => e.side === 'con');

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
          {motion.arguments && pro.map(a => <Argument key={a.id} data={a} />)}
        </div>
        <div>
          <Heading size="4">Nadelen</Heading>
          {motion.arguments && con.map(a => <Argument key={a.id} data={a} />)}
        </div>
      </Columns>
    </div>
  );
}

MotionShow.propTypes = propTypes;
MotionShow.defaultProps = defaultProps;

export default MotionShow;
