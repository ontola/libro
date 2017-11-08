import Immutable from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { MotionListItem, List } from '../components';
import { getMotions } from 'state/motions/selectors';
import { fetchMotions } from 'state/motions/actions';

import MotionContainer from 'containers/MotionContainer';

const propTypes = {
  motions: PropTypes.instanceOf(Immutable.List),
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
    const { motions } = this.props;
    // const motions = [
    //   { id: '6117dd10-2cf8-e511-9672-e4115babb880' },
    //   { id: '169b7429-14f8-e511-9672-e4115babb880' },
    //   { id: '2ea244f5-14f8-e511-9672-e4115babb880' },
    //   { id: '6717dd10-2cf8-e511-9672-e4115babb880' },
    //   { id: 'c0e2a617-79f2-e511-9672-e4115babb880' },
    //   { id: '3137bf58-89f5-e511-9672-e4115babb880' },
    // ];
    return motions.length > 0 && <List items={motions} renderItem={renderMotionContainer} />;
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
