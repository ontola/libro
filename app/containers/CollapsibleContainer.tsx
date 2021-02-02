import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux-actions';

import Collapsible from '../components/Collapsible';
import { initializeCollapsible, toggleOne } from '../state/collapsible/actions';
import { getCollapsibleOpened } from '../state/collapsible/selectors';

interface CollapsibleContainerProps {
  alwaysMountChildren?: boolean;
  children?: ReactNode;
  group?: string;
  id: string;
  onClickToggle?: () => any;
  onInitializeCollapsible?: (data: any) => Action<any>;
  opened?: boolean;
  preview?: boolean;
  startOpened?: boolean;
  visibleContent?: ReactNode;
}

interface CollapsibleContainerState {
  hideChildren: boolean;
}

const defaultProps = {
  startOpened: false,
};

class CollapsibleContainer extends Component<CollapsibleContainerProps, CollapsibleContainerState> {
  public static defaultProps = defaultProps;

  public static getDerivedStateFromProps(nextProps: CollapsibleContainerProps, prevState: CollapsibleContainerState) {
    return {
      hideChildren: !nextProps.opened && prevState ? prevState.hideChildren : false,
    };
  }

  constructor(props: CollapsibleContainerProps) {
    super(props);

    this.state = {
      hideChildren: false,
    };
    this.hideChildren = this.hideChildren.bind(this);
  }

  public componentDidMount() {
    if (this.props.id === undefined || !this.props.onInitializeCollapsible) {
      throw new Error();
    }

    this.props.onInitializeCollapsible({
      group: this.props.group,
      identifier: this.props.id,
      startOpened: this.props.startOpened,
    });
  }

  public  hideChildren() {
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
  (dispatch, { id }: any) => ({
    onClickToggle: () => dispatch(toggleOne(id)),
    onInitializeCollapsible: (data: any) => dispatch(initializeCollapsible(data)),
  }),
)(CollapsibleContainer);
