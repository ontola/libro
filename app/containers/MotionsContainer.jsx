import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { MotionListItem, List } from 'components';
import { getMotions } from 'state/motions/selectors';
import { fetchMotions } from 'state/motions/actions';

import MotionContainer from 'containers/MotionContainer';

const propTypes = {
  // motions: PropTypes.object,
  loadMotions: PropTypes.func.isRequired,
};

const defaultProps = {
  motions: {},
};

const renderMotionContainer = data => (
  <MotionContainer
    key={data.id}
    motionId={data.id}
    renderItem={MotionListItem}
  />
);

class MotionsContainer extends Component {
  componentWillMount() {
    this.props.loadMotions();
  }

  render() {
    // const { motions } = this.props;
    const motions = [
      '6117dd10-2cf8-e511-9672-e4115babb880',
      '169b7429-14f8-e511-9672-e4115babb880',
      '2ea244f5-14f8-e511-9672-e4115babb880',
      '6717dd10-2cf8-e511-9672-e4115babb880',
      'c0e2a617-79f2-e511-9672-e4115babb880',
      '3137bf58-89f5-e511-9672-e4115babb880',
    ];
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
    loadMotions: () => dispatch(fetchMotions()),
  })
)(MotionsContainer);
