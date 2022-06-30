import React from 'react';

class SuspendedLoader extends React.Component {
  constructor(props: Record<string, unknown>) {
    super(props);

    this.resolve = undefined;
    this.promise = new Promise<void>((resolve) => {
      this.resolve = resolve;
    });
  }

  componentWillUnmount() {
    if (this.resolve) {
      this.resolve();
    }
  }

  private resolve: ((value: void | PromiseLike<void>) => void) | undefined;
  private promise: Promise<void> | undefined;

  // @ts-ignore
  // eslint-disable-next-line react/require-render-return
  render() {
    throw this.promise;
  }
}

export default SuspendedLoader;
