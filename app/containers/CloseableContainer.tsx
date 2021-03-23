import React from 'react';
import { connect } from 'react-redux';

import { closeCloseable, initializeCloseable } from '../state/closeable/actions';
import { CloseableRecord, CloseableState } from '../state/closeable/reducer';
import { getCloseableOpened } from '../state/closeable/selectors';
import Button from '../components/Button';

export interface CloseableContainerProps {
  children: React.ReactNode;
  id: string;
  onClick: React.MouseEventHandler;
  onInitializeCloseable: (args: CloseableRecord) => void;
  opened: boolean;
}

const style: React.CSSProperties = { position: 'relative' };

class CloseableContainer extends React.Component<CloseableContainerProps> {
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
      <div style={style}>
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

export default connect(
  (state: { closeable: CloseableState }, ownProps: CloseableContainerProps) => ({
    opened: getCloseableOpened(state, ownProps.id) || false,
  }),
  (dispatch, { id }: CloseableContainerProps) => ({
    onClick: () => dispatch(closeCloseable(id)),
    onInitializeCloseable: (data: CloseableRecord) => dispatch(initializeCloseable(data)),
  }),
)(CloseableContainer);
