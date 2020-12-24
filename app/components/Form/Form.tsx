import equal from 'fast-deep-equal';
import { SomeNode } from 'link-lib';
import PropTypes from 'prop-types';
import React from 'react';
import { Form as FinalForm } from 'react-final-form';

import { error } from '../../helpers/logging';
import { isFunction } from '../../helpers/types';
import { withFormLRS } from '../../hooks/useFormLRS';
import Input from '../Input/Input';

interface PropTypes {
  action: string;
  autoSubmit: boolean;
  children: React.ReactNode | ((props: any) => any);
  className: string;
  form: any;
  formID: string;
  initialValues: any;
  method: string;
  object: SomeNode;
  onSubmit: (...props: any) => any;
  subscription: any;
  theme: string;
  validateOnBlur: boolean;
}

const defaultProps = {
  method: 'post',
  theme: 'default',
  validateOnBlur: false,
};

export const FormContext = React.createContext({
  formID: undefined as (undefined | string),
  object: undefined as (undefined | SomeNode),
  theme: undefined as (undefined | string),
});

const Form = (props: PropTypes) => {
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
    theme,
    validateOnBlur,
  } = props;
  const [autoSubmitted, setAutoSubmitted] = React.useState(false);
  const submitHandler = (...args: any) => onSubmit({ onSubmit: submitHandler }, ...args)
    .then(() => {
      const formApi = args[1];

      if (__CLIENT__) {
        Object
          .keys(sessionStorage)
          .forEach((k) => k.startsWith(formID) && sessionStorage.removeItem(k));
      }

      window.setTimeout(() => formApi?.reset(), 0);
    })
    .catch(error);

  const controlledSubmit = isFunction(children) ? submitHandler : onSubmit;
  React.useEffect(() => {
    if (autoSubmit && !autoSubmitted) {
      setAutoSubmitted(true);
      controlledSubmit();
    }
  }, [autoSubmit, autoSubmitted]);

  const lowerMethod = method.toLowerCase();
  const methodInput = !['get', 'post'].includes(lowerMethod) && (
    <Input name="_method" type="hidden" value={method} />
  );
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
            theme,
          }}
        >
          <form
            action={action}
            className={className || 'Form'}
            data-testid={formID}
            method={formMethod}
            onSubmit={handleSubmit}
          >
            {isFunction(children) ? children(childProps) : children}
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

export default withFormLRS(Form);
