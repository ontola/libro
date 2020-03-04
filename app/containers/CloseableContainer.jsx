import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeCloseable, initializeCloseable } from '../state/closeable/actions';
import { getCloseableOpened } from '../state/closeable/selectors';
import Button from '../components/Button';

const propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onInitializeCloseable: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
};

class CloseableContainer extends Component {
  componentDidMount() {
    if (this.props.id === undefined) {
      throw new Error();
    }

    this.props.onInitializeCloseable({
      identifier: this.props.id,
    });
  }

  render() {
    if (!this.props.opened) {
      return null;
    }

    return (
      <div style={{ position: 'relative' }}>
        <Button
          corner
          plain
          icon="close"
          title="Sluiten"
          onClick={this.props.onClick}
        />
        {this.props.children}
      </div>
    );
  }
}

CloseableContainer.propTypes = propTypes;

export default connect(
  (state, ownProps) => ({
    opened: getCloseableOpened(state, ownProps.id) || false,
  }),
  (dispatch, { id }) => ({
    onClick: () => dispatch(closeCloseable(id)),
    onInitializeCloseable: (data) => dispatch(initializeCloseable(data)),
  })
)(CloseableContainer);
