import { TopologyProvider, unstable, useLRS } from 'link-redux';
import React from 'react';

import { handle } from '../../helpers/logging';

class Topology extends TopologyProvider {
  static contextType = unstable.LinkRenderCtx;

  constructor(props) {
    super(props);

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

  renderError() {
    const ErrorRenderer = ({ context, props, reset }) => {
      const lrs = useLRS();
      const childProps = unstable.useCalculateChildProps(
        props,
        context,
        { helpers: { reset } }
      );

      return unstable.renderError(childProps, lrs, this.state.error);
    };

    return (
      <ErrorRenderer
        context={this.context}
        props={this.props}
        reset={() => this.setState({ error: undefined })}
      />
    );
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
