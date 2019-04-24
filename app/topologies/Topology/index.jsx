import { TopologyProvider, unstable } from 'link-redux';
import React from 'react';

import { handle } from '../../helpers/logging';

class Topology extends TopologyProvider {
  static contextType = unstable.LRSCtx;

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
    const childProps = unstable.calculateChildProps(
      this.props,
      this.context,
      {
        helpers: {
          reset: () => this.setState({ error: undefined }),
        },
      }
    );

    return unstable.renderError(childProps, this.context, this.state.error);
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
