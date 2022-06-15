import {
  Helpers,
  LinkRenderCtx,
  TopologyProvider,
  renderError,
  useCalculateChildProps,
  useLRS, 
} from 'link-redux';
import React, { ErrorInfo } from 'react';

import { handle } from '../../helpers/logging';

export interface TopologyState {
  error?: Error;
}

export type TopologyContent = JSX.Element;

export const renderErrorComp = (self: React.Component<Record<string, unknown>, TopologyState>) => (): JSX.Element => {
  const ErrorRenderer: React.FC<
    TopologyState & Helpers & { context: typeof self.context, props: typeof self.props }
  > = ({
    context,
    error,
    props,
    reset,
  }) => {
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
        <button
          type="button"
          onClick={reset}
        >
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

class Topology<
  P = Record<string, unknown>,
  S extends TopologyState = Record<string, unknown>,
  T extends unknown | undefined = undefined,
> extends TopologyProvider<P, S> {
  public static contextType = LinkRenderCtx;
  protected style: any;
  protected renderErrorComp: () => any;

  static get displayName(): string {
    if (this.name === 'Topology') {
      return this.name;
    }

    return `TP(${this.name})`;
  }

  static set displayName(_: string) {
    // ignore
  }

  constructor(props: P) {
    super(props);

    this.renderErrorComp = renderErrorComp(this);
    this.state = {
      error: undefined,
    } as S;
    this.style = undefined;
  }

  public componentDidCatch(error: Error, _: ErrorInfo): void {
    handle(error);
    this.setState({ error });
  }

  public getClassName(): string | undefined {
    return this.className;
  }

  public getElementProps(): Record<string, unknown> {
    return {};
  }

  public getStyle(): any {
    return this.style;
  }

  public renderContent(..._: T[]): TopologyContent {
    const Element = this.elementType as React.ElementType;

    return this.wrap((subject) => (
      <Element
        className={this.getClassName()}
        resource={subject && subject.value}
        style={this.getStyle()}
        {...this.getElementProps()}
      >
        {this.props.children}
      </Element>
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
