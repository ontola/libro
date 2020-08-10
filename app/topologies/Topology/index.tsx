import {
  Helpers,
  LinkRenderCtx,
  renderError,
  TopologyProvider,
  useCalculateChildProps,
  useLRS,
} from 'link-redux';
import React, { ErrorInfo } from 'react';

import { handle } from '../../helpers/logging';

export interface TopologyState {
  error?: Error;
}

export const renderErrorComp = (self: React.Component<{}, TopologyState>) => () => {
  const ErrorRenderer = ({
    context,
    error,
    props,
    reset,
  }: TopologyState & Helpers & { context: typeof self.context, props: typeof self.props }) => {
    const lrs = useLRS();
    try {
      const childProps = useCalculateChildProps(
        props,
        context,
        { helpers: { reset } },
      );

      return renderError(childProps, lrs, error);
    } catch (e) {
      handle(e);

      return (
        <button onClick={reset}>
          Error
        </button>
      );
    }
  };

  return (
    <ErrorRenderer
      context={self.context}
      error={self.state.error}
      props={self.props}
      reset={() => self.setState({ error: undefined })}
    />
  );
};

class Topology<P = {}, S extends TopologyState = {}> extends TopologyProvider<P, S> {
  public static contextType = LinkRenderCtx;
  protected style: any;
  protected renderErrorComp: () => any;

  static get displayName() {
    if (this.name === 'Topology') {
      return this.name;
    }

    return `TP(${this.name})`;
  }

  static set displayName(_) {
    // ignore
  }

  constructor(props: P) {
    super(props);

    this.renderErrorComp = renderErrorComp(this);
    this.state = {
      error: undefined,
    } as any;
    this.style = undefined;
  }

  public componentDidCatch(error: Error, _: ErrorInfo) {
    handle(error);
    this.setState({ error });
  }

  public getClassName() {
    return this.className;
  }

  public getStyle() {
    return this.style;
  }

  public renderContent() {
    return this.wrap((subject) => (
      <div
        className={this.getClassName()}
        resource={subject && subject.value}
        style={this.getStyle()}
      >
        {this.props.children}
      </div>
    ));
  }

  public render() {
    if (this.state.error) {
      return this.renderErrorComp();
    }

    return this.renderContent();
  }
}

export default Topology;
