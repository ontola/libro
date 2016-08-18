// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { EventShow } from 'components';
import Event from 'models/Event';
import { getEvent } from 'state/events/selectors';

const renderEvent = (data) => (
  <EventShow
    data={data}
  />
);

const propTypes = {
  creator: PropTypes.object,
  data: PropTypes.instanceOf(Event),
  eventId: PropTypes.string.isRequired,
  loadEvent: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
};

const defaultProps = {
  renderItem: renderEvent,
};

class EventContainer extends Component {
  componentWillMount() {
    const {
      data,
      eventId,
      loadEvent,
    } = this.props;

    if (data === undefined) {
      loadEvent(eventId);
    }
  }

  render() {
    const {
      data,
      renderItem,
    } = this.props;

    if (data) {
      return renderItem(
        data
      );
    }
    return false;
  }
}

EventContainer.propTypes = propTypes;
EventContainer.defaultProps = defaultProps;

export default connect(
  (state, ownProps) => ({
    data: getEvent(state, ownProps),
  }),
  (dispatch) => ({
    loadEvent: (id) => dispatch(Event.fetch(id)),
  })
)(EventContainer);
