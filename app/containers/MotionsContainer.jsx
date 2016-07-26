// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, MotionsListItem } from '../components';
import Motion from '../models/Motion';

const propTypes = {
  motions: PropTypes.arrayOf(PropTypes.instanceOf(Motion)).isRequired,
  loadMotions: PropTypes.func.isRequired,
};

class MotionsContainer extends Component {
  componentDidMount() {
    this.props.loadMotions();
  }

  render() {
    const { motions } = this.props;
    return (<List renderItem={MotionsListItem} list={motions} />);
  }
}

MotionsContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  motions: state.getIn(['motions', 'items']),
});

const mapDispatchToProps = (dispatch) => ({
  loadMotions: () => {
    dispatch(Motion.index());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MotionsContainer);
