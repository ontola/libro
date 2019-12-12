import RDFTypes from '@rdfdev/prop-types';
import equal from 'fast-deep-equal';
import PropTypes from 'prop-types';
import React from 'react';
import { Form as FinalForm } from 'react-final-form';

import { Input } from '../Input';

const propTypes = {
  action: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  /** Override the form instance */
  form: PropTypes.shape({}),
  formID: PropTypes.string.isRequired,
  method: PropTypes.oneOfType([
    PropTypes.string,
    RDFTypes.literal,
  ]),
  onSubmit: PropTypes.func.isRequired,
  validateOnBlur: PropTypes.bool,
};

const defaultProps = {
  method: 'post',
  validateOnBlur: false,
};

export const FormContext = React.createContext();

const Form = (props) => {
  const {
    action,
    children,
    className,
    form,
    formID,
    method,
    onSubmit,
    validateOnBlur,
  } = props;

  const submitHandler = (...args) => onSubmit({ onSubmit: submitHandler }, ...args)
    .then(() => {
      const formApi = args[1];

      if (__CLIENT__) {
        Object
          .keys(sessionStorage)
          .forEach(k => k.startsWith(formID) && sessionStorage.removeItem(k));
      }

      window.setTimeout(() => formApi.reset(), 0);
    });

  const renderFunc = typeof children === 'function';
  const controlledSubmit = renderFunc ? submitHandler : onSubmit;
  const lowerMethod = (typeof method === 'string' ? method : method.value).toLowerCase();
  const methodInput = !['get', 'post'].includes(lowerMethod) && <Input name="_method" type="hidden" value={method} />;
  const formMethod = lowerMethod === 'get' ? 'get' : 'post';

  return (
    <FinalForm
      form={form}
      initialValuesEqual={equal}
      render={({ handleSubmit, ...childProps }) => (
        <FormContext.Provider value={formID}>
          <form
            action={action}
            className={className || 'Form'}
            data-testid={formID}
            method={formMethod}
            onSubmit={handleSubmit}
          >
            {renderFunc ? children(childProps) : children}
            {methodInput}
          </form>
        </FormContext.Provider>
      )}
      validateOnBlur={validateOnBlur}
      onSubmit={controlledSubmit}
    />
  );
};

Form.defaultProps = defaultProps;
Form.propTypes = propTypes;

export default Form;
