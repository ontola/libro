import React from 'react';
import { ReactReduxContext } from 'react-redux';

const withReducer = (key: string, reducer: any) => (WrappedComponent: (props: any) => any) => {
  const Extended = (props: any) => {
    const context = React.useContext(ReactReduxContext);
    (context.store as any).injectReducer(key, reducer);

    return <WrappedComponent {...props} />;
  };

  return Extended;
};

export default withReducer;
