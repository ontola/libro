// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Speech from 'models/Speech';
import {
  ChronoItem,
} from '../components';

import {
  getSpeech,
  text,
} from 'state/speeches/selectors';

const propTypes = {
  data: PropTypes.instanceOf(Speech),
  searchQuery: PropTypes.string,
};

const SpeechContainer = ({
  data,
  searchQuery,
}) => (
  <ChronoItem
    attributionText={data.attributionText}
    currentDate={data.currentDate}
    endDate={data.endDate}
    eventId={data.eventId}
    highlightedText={searchQuery}
    id={data.id}
    speaker={data.speakerId}
    startDate={data.startDate}
    text={data.text}
    title={data.title}
    type={data.type}
  />
);

SpeechContainer.propTypes = propTypes;

export default connect((state, ownProps) => ({
  searchQuery: text(state),
  data: getSpeech(state, ownProps),
}))(SpeechContainer);
