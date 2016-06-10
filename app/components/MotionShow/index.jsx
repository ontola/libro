// @flow
import './motionShow.scss';
import React, { PropTypes } from 'react';
import {
  Argument,
  Box,
  Columns,
  Detail,
  DetailProfile,
  DetailsBar,
  DetailStatus,
  DetailType,
  Heading,
  MarkdownContent,
  VoteData,
} from '../';

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
        <DetailsBar>
          <DetailType
            type="motion"
          />
          <DetailStatus
            status="pass"
            voteData={motion.votes}
          />
          <DetailProfile
            name="Joep Meindertsma"
            url="https://argu.co/u/joep"
            imageUrl="https://argu-logos.s3.amazonaws.com/photos/825/icon_profielfoto_Joep_Meindertsma.jpg"
          />
          <Detail
            text="3 minuten geleden"
            icon="clock-o"
          />
        </DetailsBar>
        <MarkdownContent content={motion.description} />
      </Box>

      <VoteData data={motion.votes} expanded />

      <Columns>
        <div>
          <Box ghost><Heading size="4">Voordelen</Heading></Box>
          {motion.arguments && pro.map(a => <Argument key={a.id} data={a}/>)}
        </div>
        <div>
          <Box ghost><Heading size="4">Nadelen</Heading></Box>
          {motion.arguments && con.map(a => <Argument key={a.id} data={a} />)}
        </div>
      </Columns>
    </div>
  );
}

MotionShow.propTypes = propTypes;
MotionShow.defaultProps = defaultProps;

export default MotionShow;
