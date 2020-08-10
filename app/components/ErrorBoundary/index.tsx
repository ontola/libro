import { LinkedRenderStoreContext, LRSCtx } from 'link-redux';
import React from 'react';

import { renderErrorComp, TopologyState } from '../../topologies/Topology';

class ErrorBoundary<P extends LinkedRenderStoreContext> extends React.Component<P, TopologyState> {
  constructor(props: P) {
    super(props);

    this.state = { error: undefined };
  }

  public componentDidCatch(error: Error, _: React.ErrorInfo) {
    this.context.report(error);
    this.setState({ error });
  }

  public render(): any {
    const { children } = this.props;

    if (this.state.error) {
      return renderErrorComp(this)();
    }

    return children;
  }
}

ErrorBoundary.contextType = LRSCtx;

export default ErrorBoundary;
