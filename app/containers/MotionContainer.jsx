// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { MotionShow } from '../components';
import Motion from '../models/Motion';

const renderMotion = (activeVoteMatch, data, showArguments) => (
  <MotionShow data={data} showArguments={showArguments} activeVoteMatch={activeVoteMatch} />
);

const propTypes = {
  data: PropTypes.instanceOf(Motion),
  loadMotion: PropTypes.func.isRequired,
  motionId: PropTypes.string.isRequired,
  creator: PropTypes.object,
  renderItem: PropTypes.func.isRequired,
  showArguments: PropTypes.bool,
  activeVoteMatch: PropTypes.bool,
};

const defaultProps = {
  renderItem: renderMotion,
  showArguments: false,
};

class MotionContainer extends Component {
  componentWillMount() {
    const { data, loadMotion, motionId } = this.props;
    if (data === undefined) {
      loadMotion(motionId);
    }
  }

  render() {
    const {
      activeVoteMatch,
      data,
      renderItem,
      showArguments,
    } = this.props;

    return (
      <div>
        {data && renderItem(
          activeVoteMatch,
          data,
          showArguments
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const findMotion = state.getIn(['motions', 'items', ownProps.motionId]);
  return {
    data: findMotion,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadMotion: (id) => {
    dispatch(Motion.fetch(id));
  },
});

MotionContainer.propTypes = propTypes;
MotionContainer.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MotionContainer);
