// @flow
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MotionsList } from '../components';
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

class MotionsContainer extends React.Component {

  componentDidMount() {
    const { items, apiGetMotions } = this.props;
    apiGetMotions();
  }

  render() {
    const { items } = this.props;
    return <MotionsList data={items} />;
  }
}

MotionsContainer.propTypes = propTypes;

export default MotionsContainer;
