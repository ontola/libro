import { TopologyProvider } from 'link-redux';
import React from 'react';

class Topology extends TopologyProvider {
  getClassName() {
    return this.className;
  }

  render() {
    return this.wrap(subject => (
      <div className={this.getClassName()} resource={subject && subject.value}>
        {this.props.children}
      </div>
    ));
  }
}

export default Topology;
