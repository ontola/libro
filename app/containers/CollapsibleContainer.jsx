import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { initializeCollapsible, toggleOne } from 'state/collapsible/actions';
import { getCollapsibleOpened } from 'state/collapsible/selectors';

import { Collapsible } from '../components';

const propTypes = {
  group: PropTypes.string,
  id: PropTypes.string.isRequired,
  onInitializeCollapsible: PropTypes.func.isRequired,
  startOpened: PropTypes.bool,
};

const defaultProps = {
  startOpened: false,
};

class CollapsibleContainer extends Component {
  componentWillMount() {
    if (this.props.id === undefined) {
      throw new Error();
    }
    this.props.onInitializeCollapsible({
      group: this.props.group,
      identifier: this.props.id,
      startOpened: this.props.startOpened,
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
