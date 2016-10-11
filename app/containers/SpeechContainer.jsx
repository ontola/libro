// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Speech from 'models/Speech';
import {
  ChronoItem,
} from 'components';

import { getSpeech } from 'state/speeches/selectors';

const propTypes = {
  data: PropTypes.instanceOf(Speech),
  id: PropTypes.string.isRequired,
};

class SpeechContainer extends Component {
  componentWillMount() {
    const {
      data,
      id,
    } = this.props;
  }

  render() {
    return <ChronoItem {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const data = getSpeech(state, ownProps);
  return {
    attributionText: data.attributionText,
    children: data.text,
    currentDate: data.currentDate,
    endDate: data.endDate,
    eventId: data.eventId,
    id: data.id,
    speaker: data.speakerId,
    startDate: data.startDate,
  };
};

SpeechContainer.propTypes = propTypes;

export default connect(
  mapStateToProps
)(SpeechContainer);
