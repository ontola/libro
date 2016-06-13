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
    const { apiGetMotions, params } = this.props;
    apiGetMotions(params.motionId);
  }

  render() {
    console.log(this);
    const findMotion = this.props.motions.find(m => m.identifier === Number(this.props.params.motionId));
    return <MotionShow motion={findMotion} />;
  }
}

export default MotionContainer;
