// @flow
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MotionShow } from '../components';
import * as actionCreators from '../reducers';

const propTypes = {
  items: PropTypes.array,
  apiGetMotions: PropTypes.func,
};

@connect(
  state => ({ ...state.motions }),
  dispatch => bindActionCreators({
    ...actionCreators.motions,
  }, dispatch),
)

class MotionContainer extends React.Component {

  componentDidMount() {
    const { items, apiGetMotions, params } = this.props;
    apiGetMotions(params.motionId);
  }

  render() {
    const { items } = this.props;
    return <MotionShow data={items} />;
  }
}

MotionContainer.propTypes = propTypes;

export default MotionContainer;
