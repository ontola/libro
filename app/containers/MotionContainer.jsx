// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { MotionShow } from '../components';
import Motion from '../models/Motion';

const renderMotion = (data) => <MotionShow data={data} />;

const propTypes = {
  data: PropTypes.instanceOf(Motion),
  loadMotion: PropTypes.func.isRequired,
  motionId: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
};

const defaultProps = {
  renderItem: renderMotion,
};

class MotionContainer extends Component {
  componentWillMount() {
    this.props.loadMotion();
  }

  render() {
    const { data, renderItem } = this.props;
    return <div>{data && renderItem(data)}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const findMotion = state.getIn(['motions', 'items', ownProps.motionId]);
  return {
    data: findMotion,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadMotion: () => {
    dispatch(Motion.fetch(ownProps.motionId));
  },
});

MotionContainer.propTypes = propTypes;
MotionContainer.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MotionContainer);
