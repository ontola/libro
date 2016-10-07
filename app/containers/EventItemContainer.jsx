// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import EventItem from 'models/EventItem';
import {
  EventItemShow,
} from 'components';

import { getEventItem } from 'state/eventItems/selectors';

const propTypes = {
  data: PropTypes.instanceOf(EventItem),
  eventId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

class EventItemContainer extends Component {
  componentWillMount() {
    const {
      data,
      id,
    } = this.props;
  }

  render() {
    return <EventItemShow {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const data = getEventItem(state, ownProps);

  return {
    currentDate: data.createdAt,
    createdAt: data.createdAt,
    endDate: data.endDate,
    eventId: ownProps.eventId,
    id: data.id,
    index: data.index,
    startDate: data.startDate,
    text: data.description,
    title: data.name,
  };
};

EventItemContainer.propTypes = propTypes;

export default connect(
  mapStateToProps
)(EventItemContainer);
