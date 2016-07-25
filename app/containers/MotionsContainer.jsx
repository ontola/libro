// @flow
import React from 'react';
import { connect } from 'react-redux';
import { List, MotionsListItem } from '../components';
import { Motion } from '../models';

const getMotions = Motion.index();
const renderMotion = (motion) => (
  <MotionsListItem
    key={motion.id}
    motion={motion}
  />
);

const mapStateToProps = (state) => ({
  list: state.getIn(['motions', 'items']).toArray(),
  renderItem: renderMotion,
});

const mapDispatchToProps = (dispatch) => ({
  actions: dispatch(getMotions),
});

const MotionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

export default MotionsContainer;
