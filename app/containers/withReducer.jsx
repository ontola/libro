import React from 'react';
import PropTypes from 'prop-types';

const withReducer = (key, reducer) => (WrappedComponent) => {
  const Extended = (props, context) => {
    context.store.injectReducer(key, reducer);

    return <WrappedComponent {...props} />;
  };

  Extended.contextTypes = {
    store: PropTypes.shape({
      asyncReducers: PropTypes.objectOf(PropTypes.string),
      injectReducer: PropTypes.func,
    }),
  };

  return Extended;
};

export default withReducer;
