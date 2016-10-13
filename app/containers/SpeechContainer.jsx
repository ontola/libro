// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Speech from 'models/Speech';
import {
  ChronoItem,
} from 'components';

import { getSpeech } from 'state/speeches/selectors';

const propTypes = {
  data: PropTypes.instanceOf(Speech),
};

const SpeechContainer = ({
  data,
}) => (
  <ChronoItem
    attributionText={data.attributionText}
    currentDate={data.currentDate}
    endDate={data.endDate}
    eventId={data.eventId}
    id={data.id}
    speaker={data.speakerId}
    startDate={data.startDate}
  >
    {data.text}
  </ChronoItem>
);

SpeechContainer.propTypes = propTypes;

export default connect(
  (state, ownProps) => ({
    data: getSpeech(state, ownProps),
  })
)(SpeechContainer);
