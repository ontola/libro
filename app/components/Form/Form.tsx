import equal from 'fast-deep-equal';
import { SomeNode } from 'link-lib';
import PropTypes from 'prop-types';
import React from 'react';
import { Form as FinalForm } from 'react-final-form';

import { error } from '../../helpers/logging';
import { isFunction } from '../../helpers/types';
import { withFormLRS } from '../../hooks/useFormLRS';
import { SubmissionErrors } from '../FormField';
import Input from '../Input/Input';

interface PropTypes {
  action: string;
  autofocusForm: boolean;
  autoSubmit: boolean;
  children: React.ReactNode | ((props: any) => any);
  className: string;
  form: any;
  formID: string;
  formIRI: SomeNode;
  formSection: string;
  initialValues: any;
  method: string;
  object: SomeNode;
  onKeyUp: (e: any) => any;
  onSubmit: (...props: any) => any;
  sessionStore: Storage;
  submissionErrors: SubmissionErrors;
  subscription: any;
  theme: string;
  validateOnBlur: boolean;
  whitelist: number[];
}

const defaultProps = {
  method: 'post',
  theme: 'default',
  validateOnBlur: false,
};

export const FormContext = React.createContext({
  autofocusForm: undefined as (undefined | boolean),
  formID: undefined as (undefined | string),
  formIRI: undefined as (undefined | SomeNode),
  formSection: undefined as (undefined | string),
  object: undefined as (undefined | SomeNode),
  onKeyUp: undefined as (undefined | ((e: any) => any)),
  sessionStore: undefined as (undefined | Storage),
  submissionErrors: undefined as (undefined | SubmissionErrors),
  theme: undefined as (undefined | string),
  whitelist: undefined as (undefined | number[]),
});

const Form = (props: PropTypes) => {
  const {
    action,
    autofocusForm,
    autoSubmit,
    children,
    className,
    form,
    formID,
    formIRI,
    initialValues,
    method,
    object,
    onKeyUp,
    onSubmit,
    sessionStore,
    subscription,
    submissionErrors,
    theme,
    whitelist,
    validateOnBlur,
  } = props;
  const [autoSubmitted, setAutoSubmitted] = React.useState(false);
  const submitHandler = React.useCallback((...args: any) => (
    onSubmit({onSubmit: submitHandler}, ...args).then(() => {
      const formApi = args[1];

      if (__CLIENT__) {
        Object.keys(sessionStorage).forEach((k) => k.startsWith(formID) && sessionStorage.removeItem(k));
      }

      window.setTimeout(() => formApi?.reset(), 0);
    }).catch(error)
  ), [onSubmit, sessionStorage, formID]) as (args: any) => any;
  const controlledSubmit = isFunction(children) ? submitHandler : onSubmit;
  React.useEffect(() => {
    if (autoSubmit && !autoSubmitted) {
      setAutoSubmitted(true);
      controlledSubmit();
    }
  }, [autoSubmit, autoSubmitted]);
  const context = React.useMemo(() => ({
    autofocusForm,
    formID,
    formIRI,
    formSection: undefined,
    object,
    onKeyUp,
    sessionStore,
    submissionErrors,
    theme,
    whitelist,
  }), [
    autofocusForm,
    formID,
    formIRI,
    object,
    onKeyUp,
    sessionStore,
    submissionErrors,
    theme,
    whitelist,
  ]);

  const lowerMethod = method.toLowerCase();
  const methodInput = !['get', 'post'].includes(lowerMethod) && (
    <Input name="_method" type="hidden" value={method}/>
  );
  const formMethod = lowerMethod === 'get' ? 'get' : 'post';
  const render = React.useCallback(({handleSubmit, ...childProps}) => (
    <FormContext.Provider value={context}>
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
  ), [action, className, formID, formMethod, children, methodInput]);

  return (
    <FinalForm
      destroyOnUnregister
      form={form}
      initialValues={initialValues}
      initialValuesEqual={equal}
      key={formID}
      render={render}
      subscription={subscription}
      validateOnBlur={validateOnBlur}
      onSubmit={controlledSubmit}
    />
  );
};

Form.defaultProps = defaultProps;

export default withFormLRS(Form);
