import { DataProcessor } from 'link-lib';
import { LinkedRenderStore } from 'link-lib/dist-types/LinkedRenderStore';
import { LRSCtx } from 'link-redux';
import React, { ChildrenProp } from 'react';

import { TopologyState } from '../../../Core/lib/topology';

import ErrorRenderer from './ErrorRenderer';

class ErrorBoundary<P extends ChildrenProp> extends React.Component<P, TopologyState> {
  static contextType = LRSCtx;

  constructor(props: P) {
    super(props);

    this.state = { error: undefined };
  }

  public componentDidCatch(error: Error, _: React.ErrorInfo): void {
    this.context.report(error);
    this.setState({ error });
  }

  context!: LinkedRenderStore<any, DataProcessor>;

  public render(): any {
    const { children } = this.props;

    if (this.state.error) {
      return (
        <ErrorRenderer
          error={this.state.error}
          props={this.props}
          reset={() => this.setState({ error: undefined })}
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
