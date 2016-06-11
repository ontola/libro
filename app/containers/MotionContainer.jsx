// @flow
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MotionShow } from '../components';
import * as actionCreators from '../reducers';

@connect(
  state => ({...state.motions}),
  dispatch => bindActionCreators({
    ...actionCreators.motions,
  }, dispatch),
)

class MotionContainer extends React.Component {

  componentDidMount() {
    const { apiGetMotions, setActiveMotion, params } = this.props;
    apiGetMotions(params.motionId);
    setActiveMotion(params.motionId);
  }

  render() {
    const { motions, activeMotion } = this.props;
    const findMotion = motions.find(m => m.identifier === Number(activeMotion));
    return <MotionShow motion={findMotion} />;
  }
}

export default MotionContainer;
