import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { initializeCollapsible, toggleOne } from 'state/collapsible/actions';
import { getCollapsibleOpened } from 'state/collapsible/selectors';

import { Collapsible } from '../components';

const propTypes = {
  id: PropTypes.string.isRequired,
  group: PropTypes.string,
  startOpened: PropTypes.bool,
  onInitializeCollapsible: PropTypes.func.isRequired,
};

const defaultProps = {
  startOpened: false,
};

class CollapsibleContainer extends Component {
  componentWillMount() {
    this.props.onInitializeCollapsible({
      startOpened: this.props.startOpened,
      identifier: this.props.id,
      group: this.props.group,
    });
  }

  render() {
    return <Collapsible {...this.props} />;
  }
}

CollapsibleContainer.propTypes = propTypes;
CollapsibleContainer.defaultProps = defaultProps;

export default connect(
  (state, ownProps) => ({
    opened: getCollapsibleOpened(state, ownProps.id),
  }),
  (dispatch, { id }) => ({
    onClickToggle: () => dispatch(toggleOne(id)),
    onInitializeCollapsible: data => dispatch(initializeCollapsible(data)),
  })
)(CollapsibleContainer);
