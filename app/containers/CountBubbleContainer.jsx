import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Count from 'models/Count';
import { fetchCount } from 'state/counts/actions';
import {
  OpinionBubble,
} from 'components';
// import {
//   getCount,
// } from 'state/counts/selectors';
import {
  getGroupByCount,
} from 'state/groups/selectors';

const defaultRenderItem = data => (
  <OpinionBubble
    image={data.image}
    side={data.option}
  />
);

const propTypes = {
  loadCount: PropTypes.func,
  data: PropTypes.instanceOf(Count),
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
    // debugger;

    const { data, renderItem } = this.props;
    return data !== undefined && renderItem(data);
  }
}

CountBubbleContainer.propTypes = propTypes;
CountBubbleContainer.defaultProps = defaultProps;

export default connect(
  (state, ownProps) => ({
    // data: getCount(state, ownProps),
    data: getGroupByCount(state, ownProps),
  }),
  (dispatch, ownProps) => ({
    loadCount: () => dispatch(fetchCount(ownProps.id)),
  })
)(CountBubbleContainer);
