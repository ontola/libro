import RDFTypes from '@rdfdev/prop-types';
import equal from 'fast-deep-equal';
import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Form as FinalForm } from 'react-final-form';

import { Input } from '../Input';

const propTypes = {
  action: PropTypes.string,
  autoSubmit: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  /** Override the form instance */
  form: PropTypes.shape({}),
  formID: PropTypes.string.isRequired,
  initialValues: PropTypes.objectOf(PropTypes.any),
  method: PropTypes.oneOfType([
    PropTypes.string,
    RDFTypes.literal,
  ]),
  object: linkType,
  onSubmit: PropTypes.func.isRequired,
  subscription: PropTypes.objectOf(PropTypes.any),
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
    autoSubmit,
    children,
    className,
    form,
    formID,
    initialValues,
    method,
    object,
    onSubmit,
    subscription,
    validateOnBlur,
  } = props;
  const [autoSubmitted, setAutoSubmitted] = React.useState(false);
  const submitHandler = (...args) => onSubmit({ onSubmit: submitHandler }, ...args)
    .then(() => {
      const formApi = args[1];

      if (__CLIENT__) {
        Object
          .keys(sessionStorage)
          .forEach((k) => k.startsWith(formID) && sessionStorage.removeItem(k));
      }

      window.setTimeout(() => formApi.reset(), 0);
    });

  const renderFunc = typeof children === 'function';
  const controlledSubmit = renderFunc ? submitHandler : onSubmit;
  React.useEffect(() => {
    if (autoSubmit && !autoSubmitted) {
      setAutoSubmitted(true);
      controlledSubmit();
    }
  }, [autoSubmit, autoSubmitted]);

  const lowerMethod = (typeof method === 'string' ? method : method.value).toLowerCase();
  const methodInput = !['get', 'post'].includes(lowerMethod) && <Input name="_method" type="hidden" value={method} />;
  const formMethod = lowerMethod === 'get' ? 'get' : 'post';

  return (
    <FinalForm
      destroyOnUnregister
      form={form}
      initialValues={initialValues}
      initialValuesEqual={equal}
      key={formID}
      render={({ handleSubmit, ...childProps }) => (
        <FormContext.Provider
          value={{
            formID,
            object,
          }}
        >
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
      subscription={subscription}
      validateOnBlur={validateOnBlur}
      onSubmit={controlledSubmit}
    />
  );
};

Form.defaultProps = defaultProps;
Form.propTypes = propTypes;

export default Form;
