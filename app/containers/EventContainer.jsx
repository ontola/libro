// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Event from 'models/Event';
import { getEvent } from 'state/events/selectors';
import { fetchEvent } from 'state/events/actions';
import { toggleAll } from 'state/collapsible/actions';

import { EventShow } from '../components';

const propTypes = {
  data: PropTypes.instanceOf(Event),
  id: PropTypes.string.isRequired,
  loadEvent: PropTypes.func.isRequired,
  onToggleAll: PropTypes.func.isRequired,
  renderItem: PropTypes.func,
};

const defaultProps = {
  renderItem: EventShow,
};

class EventContainer extends Component {
  componentWillMount() {
    const { data } = this.props;

    if (data === undefined) {
      this.props.loadEvent(this.props.id);
    }
  }


  render() {
    const {
      data,
      renderItem,
    } = this.props;
    const RenderComponent = renderItem;

    if (data === undefined) {
      return false;
    }

    return (
      <RenderComponent
        attendeesPresent={data.attendees}
        createdAt={data.createdAt}
        description={data.description}
        endDate={data.endDate}
        eventItems={data.eventItems}
        id={data.id}
        onToggleAll={this.props.onToggleAll}
        speeches={data.speeches}
        startDate={data.startDate}
        status={data.status}
        title={data.title}
      />
    );
  }
}

EventContainer.propTypes = propTypes;
EventContainer.defaultProps = defaultProps;

export default connect(
  (state, ownProps) => ({
    data: getEvent(state, ownProps),
  }),
  dispatch => ({
    onToggleAll: id => dispatch(toggleAll({ group: `event.${id}` })),
    loadEvent: id => dispatch(fetchEvent(id)),
  })
)(EventContainer);
