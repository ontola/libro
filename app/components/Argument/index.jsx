// @flow
import './argument.scss';
import React, { PropTypes } from 'react';
import {
  Box,
  Detail,
  DetailProfile,
  DetailsBar,
  Heading,
  MarkdownContent,
} from '../';

const propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    side: PropTypes.oneOf([
      'pro',
      'con',
    ]),
  }),
};

const defaultProps = {
  data: {
    title: 'Loading...',
    text: '...',
  },
};

function Argument({ data }) {
  const buttons = [{
    label: 'Reageer',
    icon: 'comment',
    action() {
      console.log('Reactie op:', data.title);
    },
  }, {
    label: 'Upvote',
    icon: 'arrow-up',
    action() {
      console.log('Upvote voor:', data.title);
    },
  }];

  return (
    <Box buttons={buttons}>
      <Heading size="3" className={data.side}>{data.title}</Heading>
      <DetailsBar>
        <DetailProfile
          name="Joep Meindertsma"
          url="https://argu.co/u/joep"
          imageUrl="https://argu-logos.s3.amazonaws.com/photos/825/icon_profielfoto_Joep_Meindertsma.jpg"
        />
        <Detail text="3 minuten geleden" icon="clock-o" />
      </DetailsBar>
      <MarkdownContent content={data.text} />
    </Box>
  );
}

Argument.propTypes = propTypes;
Argument.defaultProps = defaultProps;

export default Argument;
