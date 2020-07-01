import PropTypes from 'prop-types';
import React from 'react';

import useFormField from '../../hooks/useFormField';

const propTypes = {
  addFieldName: PropTypes.func,
  minCount: PropTypes.number,
  required: PropTypes.bool,
  type: PropTypes.string,
};

const formFieldWrapper = (Component) => {
  const WrappedComp = ({ addFieldName, ...props }) => {
    const required = props.required || (props.minCount ? props.minCount > 0 : false);

    const [input, meta, storeKey] = useFormField({
      required,
      ...props,
    });

    React.useLayoutEffect(() => {
      if (input && addFieldName) {
        addFieldName(input.name);
      }
    }, [input?.name]);

    if (!input) {
      return null;
    }

    const minCount = props.type !== 'association' && typeof props.minCount === 'undefined' ? 1 : props.minCount;

    return (
      <Component
        {...props}
        input={input}
        meta={meta}
        minCount={minCount}
        required={required}
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
