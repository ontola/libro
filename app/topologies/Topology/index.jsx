import {
  LinkRenderCtx,
  TopologyProvider,
  renderError,
  useCalculateChildProps,
  useLRS,
} from 'link-redux';
import React from 'react';

import { handle } from '../../helpers/logging';

export const renderErrorComp = self => () => {
  const ErrorRenderer = ({
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
        { helpers: { reset } }
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
      error={self.error}
      props={self.props}
      reset={() => self.setState({ error: undefined })}
    />
  );
};

class Topology extends TopologyProvider {
  static contextType = LinkRenderCtx;

  static get displayName() {
    if (this.name === 'Topology') {
      return this.name;
    }

    return `TP(${this.name})`;
  }

  static set displayName(ignored) {
    // ignore
  }

  constructor(props) {
    super(props);

    this.renderErrorComp = renderErrorComp(this);
    this.state = {
      error: undefined,
    };
    this.style = undefined;
  }

  componentDidCatch(error, ignored) {
    handle(error);
    this.setState({ error });
  }

  getClassName() {
    return this.className;
  }

  getStyle() {
    return this.style;
  }

  renderContent() {
    return this.wrap(subject => (
      <div
        className={this.getClassName()}
        resource={subject && subject.value}
        style={this.getStyle()}
      >
        {this.props.children}
      </div>
    ));
  }

  render() {
    if (this.state.error) {
      return this.renderErrorComp();
    }

    return this.renderContent();
  }
}

export default Topology;
