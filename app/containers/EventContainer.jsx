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
  onToggleAll: PropTypes.func.isRequired,
};

class EventContainer extends Component {
  componentWillMount() {
    const { data } = this.props;

    if (data === undefined) {
      this.props.loadEvent(this.props.id);
    }
  }

  render() {
    const { data } = this.props;

    if (data === undefined) {
      return false;
    }

    return (
      <EventShow
        attendeesPresent={data.attendees}
        createdAt={data.createdAt}
        description={data.description}
        endDate={data.endDate}
        eventItems={data.eventItems}
        onToggleAll={this.props.onToggleAll}
        speeches={data.speeches}
        startDate={data.startDate}
        status={data.status}
        title={data.name}
      />
    );
  }
}

EventContainer.propTypes = propTypes;

export default connect(
  (state, ownProps) => ({
    data: getEvent(state, ownProps),
  }),
  (dispatch) => ({
    onToggleAll: (id) => dispatch(toggleAll({ group: `event.${id}` })),
    loadEvent: (id) => dispatch(fetchEvent(id)),
  })
)(EventContainer);
