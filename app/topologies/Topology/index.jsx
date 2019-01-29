import { TopologyProvider, unstable } from 'link-redux';
import { calculateChildProps } from 'link-redux/dist/typings/components/withLinkCtx';
import React from 'react';

import { handle } from '../../helpers/logging';

class Topology extends TopologyProvider {
  static contextType = unstable.LinkCtx;

  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
    };
  }

  componentDidCatch(error, ignored) {
    handle(error);
    this.setState({ error });
  }

  getClassName() {
    return this.className;
  }

  render() {
    if (this.state.error) {
      const childProps = calculateChildProps(
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

    return this.wrap(subject => (
      <div className={this.getClassName()} resource={subject && subject.value}>
        {this.props.children}
      </div>
    ));
  }
}

export default Topology;
