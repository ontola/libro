// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, MotionsListItem } from '../components';
import MotionContainer from './MotionContainer';
import Motion from '../models/Motion';

const propTypes = {
  motions: PropTypes.array,
  loadMotions: PropTypes.func.isRequired,
};

const defaultProps = {
  motions: [],
};

const renderItem = data => (
  <MotionsListItem
    motion={data}
  />
);

class MotionsContainer extends Component {
  componentDidMount() {
    this.props.loadMotions();
  }

  renderContainer(m) {
    return (
      <MotionContainer key={m} motionId={m} renderItem={renderItem} />
    );
  }

  render() {
    // const { motions } = this.props;
    const motions = [
      '245245',
      '987654',
      '136743',
      '367333',
      '195075',
      '642621',
      '334672',
      '358964',
      '752183',
    ];

    return <List renderItem={this.renderContainer} items={motions} />;
  }
}

MotionsContainer.defaultProps = defaultProps;
MotionsContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  motions: state.getIn(['motions', 'items']).toArray(),
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
