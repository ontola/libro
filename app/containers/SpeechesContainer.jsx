// @flow
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  ChronoFeed,
} from '../components';

import {
  getFilteredSpeechesForEvent,
} from 'state/speeches/selectors';

const propTypes = {
  /** Array of SpeechIds */
  speechIds: PropTypes.array,
  eventId: PropTypes.string.isRequired,
};

const SpeechesContainer = connect(
  (state, ownProps) => ({
    speechIds: getFilteredSpeechesForEvent(state, ownProps),
  })
)(ChronoFeed);

SpeechesContainer.propTypes = propTypes;

export default SpeechesContainer;
