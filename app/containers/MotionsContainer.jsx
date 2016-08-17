// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { List, MotionsListItem } from 'components';
import MotionContainer from 'containers/MotionContainer';
import Motion from 'models/Motion';
import { getMotions } from 'state/motions/selectors';
import { formatDate } from 'helpers/date';

const propTypes = {
  motions: PropTypes.object,
  loadMotions: PropTypes.func.isRequired,
};

const defaultProps = {
  motions: {},
};

const renderMotion = (data) => (
  <MotionsListItem
    key={data.id}
    createdAt={formatDate(data.createdAt)}
    creator={data.creator}
    id={data.id}
    title={data.title}
    votes={data.votes}
  />
);

const renderMotionContainer = (data) => (
  <MotionContainer
    key={data.id}
    motionId={data.id}
    renderItem={renderMotion}
  />
);

class MotionsContainer extends Component {
  componentWillMount() {
    this.props.loadMotions();
  }

  render() {
    const { motions } = this.props;
    return motions.size > 0 && <List renderItem={renderMotionContainer} items={motions} />;
  }
}

MotionsContainer.defaultProps = defaultProps;
MotionsContainer.propTypes = propTypes;

export default connect(
  state => ({
    motions: getMotions(state),
  }),
  dispatch => ({
    loadMotions: () => { dispatch(Motion.index()); },
  })
)(MotionsContainer);
