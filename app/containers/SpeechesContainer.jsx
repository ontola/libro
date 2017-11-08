import { PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  getFilteredSpeechesForEvent,
} from 'state/speeches/selectors';

import {
  ChronoFeed,
} from '../components';

const propTypes = {
  eventId: PropTypes.string.isRequired,
  /** Array of SpeechIds */
  speechIds: PropTypes.arrayOf(PropTypes.string),
};

const SpeechesContainer = connect((state, ownProps) => ({
  speechIds: getFilteredSpeechesForEvent(state, ownProps),
}))(ChronoFeed);

SpeechesContainer.propTypes = propTypes;

export default SpeechesContainer;
