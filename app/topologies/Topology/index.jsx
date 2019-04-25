import { TopologyProvider, unstable, useLRS } from 'link-redux';
import React from 'react';

import { handle } from '../../helpers/logging';

export const renderError = self => () => {
  const ErrorRenderer = ({
    context,
    error,
    props,
    reset,
  }) => {
    const lrs = useLRS();
    const childProps = unstable.useCalculateChildProps(
      props,
      context,
      { helpers: { reset } }
    );

    return unstable.renderError(childProps, lrs, error);
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
  static contextType = unstable.LinkRenderCtx;

  constructor(props) {
    super(props);

    this.renderError = renderError(this);
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
      return this.renderError();
    }

    return this.renderContent();
  }
}

export default Topology;
