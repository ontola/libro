// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, MotionsListItem } from '../components';
import Motion from '../models/Motion';

const propTypes = {
  motions: PropTypes.object,
  loadMotions: PropTypes.func.isRequired,
};

const defaultProps = {
  motions: {},
};

const renderItem = (data) => (
  <MotionsListItem
    key={data.id}
    motion={data}
  />
);

class MotionsContainer extends Component {
  componentWillMount() {
    this.props.loadMotions();
  }

  render() {
    const { motions } = this.props;
    return motions.size > 0 && <List renderItem={renderItem} items={motions} />;
  }
}

MotionsContainer.defaultProps = defaultProps;
MotionsContainer.propTypes = propTypes;

export default connect(
  state => ({ motions: state.getIn(['motions', 'items']) }),
  dispatch => ({ loadMotions: () => { dispatch(Motion.index()); } })
)(MotionsContainer);
