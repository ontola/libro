import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';

import Collapsible, { CollapsibleProps } from '../components/Collapsible';
import { initializeCollapsible, InitializeCollapsiblePayload, toggleOne } from '../state/collapsible/actions';
import { getCollapsibleOpened } from '../state/collapsible/selectors';

interface SelfProvidedProps {
  onClickToggle: () => void;
  hasChildren: boolean;
  notOpened: () => void;
  hideChildren: boolean;
}

export interface CollapsibleContainerProps extends Omit<Partial<CollapsibleProps>, keyof SelfProvidedProps> {
  id: string;
  children: ReactNode;
  onInitializeCollapsible?: (data: InitializeCollapsiblePayload) => void;
  opened?: boolean;
  startOpened?: boolean;
}

type CollapsibleContainerPropsDefaulted = typeof CollapsibleContainer.defaultProps & CollapsibleContainerProps;

interface CollapsibleContainerState {
  hideChildren: boolean;
}

class CollapsibleContainer extends Component<CollapsibleContainerPropsDefaulted, CollapsibleContainerState> {

  public static defaultProps = {
    startOpened: false,
  };

  public static getDerivedStateFromProps(nextProps: CollapsibleContainerProps, prevState: CollapsibleContainerState) {
    return {
      hideChildren: !nextProps.opened && prevState ? prevState.hideChildren : false,
    };
  }

  constructor(props: CollapsibleContainerPropsDefaulted) {
    super(props);

    this.state = {
      hideChildren: false,
    };

    this.hideChildren = this.hideChildren.bind(this);
  }

  public componentDidMount() {
    if (this.props.id === undefined) {
      throw new Error();
    }

    this.props.onInitializeCollapsible!({
      identifier: this.props.id,
      startOpened: this.props.startOpened,
    });
  }

  public hideChildren() {
    this.setState({
      hideChildren: true,
    });
  }

  public render() {
    return (
      <Collapsible
        {...this.props}
        hideChildren={this.state.hideChildren}
        notOpened={this.hideChildren}
      />
    );
  }
}

export default connect(
  (state, ownProps: CollapsibleContainerProps) => ({
    opened: getCollapsibleOpened(state, ownProps.id),
  }),
  (dispatch, { id }: CollapsibleContainerProps) => ({
    onClickToggle: () => dispatch(toggleOne(id)),
    onInitializeCollapsible: (data: InitializeCollapsiblePayload) => dispatch(initializeCollapsible(data)),
  }),
)(CollapsibleContainer);
