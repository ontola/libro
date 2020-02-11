import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import useFormField from '../../hooks/useFormField';

const propTypes = {
  field: PropTypes.string.isRequired,
  initialValue: linkType,
  sessionStorage: PropTypes.shape({
    getItem: PropTypes.func,
    setItem: PropTypes.func,
  }),
  type: PropTypes.string.isRequired,
  validate: PropTypes.func,
};

const formFieldWrapper = (Component) => {
  const WrappedComp = (props) => {
    const [input, formProps, storeKey] = useFormField(props);

    return (
      <Component
        {...props}
        {...formProps}
        input={input}
        storeKey={storeKey}
      />
    );
  };

  WrappedComp.displayName = `FormFieldWrapper(${Component.displayName})`;
  WrappedComp.propTypes = propTypes;

  return WrappedComp;
};

formFieldWrapper.displayName = 'formFieldWrapper';

export default formFieldWrapper;
