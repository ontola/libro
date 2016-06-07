// import './motionShow.scss';
import React, { PropTypes } from 'react';
import { Heading, Box, Columns, Argument, VoteData } from '../';
import _ from 'lodash/core';

function MotionShow({ motion }) {
  const pro = _.filter(motion.arguments, { side: 'pro' });
  const con = _.filter(motion.arguments, { side: 'con' });

  return (
    <div>
      <Box type="motion">
        <Heading size="2">{motion.title}</Heading>
        <div>{motion.description}</div>
      </Box>

      <VoteData data={motion.votes} expanded />

      <Columns>
        <div>
          <Heading size="4">Voordelen</Heading>
          {_.map(pro, a =>
            <Argument key={a.id} data={a} />
          )}
        </div>
        <div>
          <Heading size="4">Nadelen</Heading>
          {_.map(con, a =>
            <Argument key={a.id} data={a} />
          )}
        </div>
      </Columns>
    </div>
  );
}

MotionShow.propTypes = {
  motion: PropTypes.shape({
    title: PropTypes.string,
    votes: PropTypes.array,
    arguments: PropTypes.array,
  }),
};

MotionShow.defaultProps = {
  motion: {
    title: 'Laden...',
  },
};

export default MotionShow;
