// We always throw, so the implicit return value is void
import React from 'react';

class SuspendedLoader extends React.Component {
  constructor(props) {
    super(props);

    this.resolve = undefined;
    this.promise = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }

  componentWillUnmount() {
    this.resolve();
  }

  // eslint-disable-next-line react/require-render-return
  render() {
    throw this.promise;
  }
}

export default SuspendedLoader;
