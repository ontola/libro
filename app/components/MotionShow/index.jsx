// @flow
// import './motionShow.scss';
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
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    votes: PropTypes.object,
    arguments: PropTypes.array,
  }),
};

const defaultProps = {
  data: {
    title: 'Laden...',
    votes: {},
    arguments: [
      {
        side: 'pro',
        title: 'Joe',
        text: 'Geen argumenten voor',
      },
      {
        side: 'con',
        title: 'Joe',
        text: 'Geen argumenten tegen',
      },
    ],
  },
};

function MotionShow({ data }) {
  const pro = data.arguments && data.arguments.filter(e => e.side === 'pro');
  const con = data.arguments && data.arguments.filter(e => e.side === 'con');

  const buttons = [{
    label: 'Ik ben voor',
    icon: 'thumbs-up',
    action() {
      console.log('Ik ben voor:', data.title);
    },
  }, {
    label: 'Neutraal',
    icon: 'pause',
    action() {
      console.log('Ik ben neutraal:', data.title);
    },
  }, {
    label: 'Ik ben tegen',
    icon: 'thumbs-down',
    action() {
      console.log('Ik ben tegen:', data.title);
    },
  }];

  return (
    <div>
      <Box buttons={buttons}>
        <Heading size="2">{data.title}</Heading>
        <DetailsBar>
          <Detail text="Motie" icon="lightbulb-o" />
          <Detail text="Verworpen" icon="close" />
          <Detail text="Joep Meindertsma" icon="user" />
          <Detail text="3 minuten geleden" icon="clock-o" />
        </DetailsBar>
        <MarkdownContent content={data.description} />
      </Box>

      <VoteData data={data.votes} expanded />

      <Columns>
        <div>
          <Box ghost><Heading size="4">Voordelen</Heading></Box>
          { pro.map(a => <Argument key={a.id} data={a}/>) }
        </div>
        <div>
          <Box ghost><Heading size="4">Nadelen</Heading></Box>
          { con.map(a => <Argument key={a.id} data={a} />) }
        </div>
      </Columns>
    </div>
  );
}

MotionShow.propTypes = propTypes;
MotionShow.defaultProps = defaultProps;

export default MotionShow;
