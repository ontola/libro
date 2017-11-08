import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Count from 'models/Count';
import { fetchCount } from 'state/counts/actions';
import {
  getGroupByCount,
} from 'state/groups/selectors';

import OpinionBubble from '../views/OpinionBubble';

const defaultRenderItem = data => (
  <OpinionBubble
    image={data.image}
    name={data.name}
  />
);

const propTypes = {
  data: PropTypes.instanceOf(Count),
  loadCount: PropTypes.func,
  renderItem: PropTypes.func,
};

const defaultProps = {
  renderItem: defaultRenderItem,
};

class CountBubbleContainer extends Component {
  componentWillMount() {
    const { data, loadCount } = this.props;
    if (data === undefined) {
      loadCount();
    }
  }

  render() {
    const { data, renderItem } = this.props;
    return data !== undefined && renderItem(data);
  }
}

CountBubbleContainer.propTypes = propTypes;
CountBubbleContainer.defaultProps = defaultProps;

export default connect(
  (state, ownProps) => ({
    data: getGroupByCount(state, ownProps),
  }),
  (dispatch, ownProps) => ({
    loadCount: () => dispatch(fetchCount(ownProps.id)),
  })
)(CountBubbleContainer);
