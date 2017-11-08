import { PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  getFilteredSpeechesForEvent,
} from 'state/speeches/selectors';

import {
  ChronoFeed,
} from '../components';

const propTypes = {
  /** Array of SpeechIds */
  speechIds: PropTypes.arrayOf(PropTypes.string),
  eventId: PropTypes.string.isRequired,
};

const SpeechesContainer = connect((state, ownProps) => ({
  speechIds: getFilteredSpeechesForEvent(state, ownProps),
}))(ChronoFeed);

SpeechesContainer.propTypes = propTypes;

export default SpeechesContainer;
