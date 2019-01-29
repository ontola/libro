import React from 'react';
import { ReactReduxContext } from 'react-redux';

const withReducer = (key, reducer) => (WrappedComponent) => {
  const Extended = (props) => {
    const context = React.useContext(ReactReduxContext);
    context.store.injectReducer(key, reducer);

    return <WrappedComponent {...props} />;
  };

  return Extended;
};

export default withReducer;
