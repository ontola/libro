// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { EventShow } from 'components';
import { getEvent } from 'state/events/selectors';
import { fetchEvent } from 'state/events/actions';
import { toggleAll } from 'state/collapsible/actions';

const propTypes = {
  data: PropTypes.instanceOf(Event),
  id: PropTypes.string.isRequired,
  loadEvent: PropTypes.func.isRequired,
};

class EventContainer extends Component {
  componentWillMount() {
    const { data } = this.props;

    if (data === undefined) {
      this.props.loadEvent(this.props.id);
    }
  }

  render() {
    return <EventShow {...this.props} />;
  }
}

EventContainer.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
  const data = getEvent(state, ownProps);

  if (data === undefined) {
    return {};
  }
  return {
    attendeesPresent: data.attendees,
    createdAt: data.createdAt,
    description: data.description,
    eventItems: data.eventItems,
    endDate: data.endDate,
    startDate: data.startDate,
    title: data.name,
    status: data.status,
    speeches: data.speeches,
  };
};

export default connect(
  mapStateToProps,
  (dispatch) => ({
    onToggleAll: (id) => {
      dispatch(toggleAll({ group: `event.${id}` }));
    },
    loadEvent: (id) => dispatch(fetchEvent(id)),
  })
)(EventContainer);
