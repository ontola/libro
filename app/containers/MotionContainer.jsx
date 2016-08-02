// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { MotionShow } from '../components';
import Motion from '../models/Motion';

const renderMotion = (data, showArguments) => (
  <MotionShow data={data} showArguments={showArguments} />
);

const propTypes = {
  data: PropTypes.instanceOf(Motion),
  loadMotion: PropTypes.func.isRequired,
  motionId: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
  showArguments: PropTypes.bool,
};

const defaultProps = {
  renderItem: renderMotion,
  showArguments: false,
};

class MotionContainer extends Component {
  componentWillMount() {
    this.props.loadMotion();
  }

  render() {
    const { data, renderItem, showArguments } = this.props;
    return <div>{data && renderItem(data, showArguments)}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const findMotion = state.getIn(['motions', 'items', ownProps.motionId]);
  // const findArguments = findMotion.arguments &&
  //   findMotion.arguments.map(id => state.getIn(['argumentations', 'items', id]));
  //
  // console.log(findArguments);

  return {
    data: findMotion,
    // argumentations: ownProps.showArguments && findArguments,
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
