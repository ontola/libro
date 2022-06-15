import equal from 'fast-deep-equal';
import { FormApi, MutableState } from 'final-form';
import { SomeNode } from 'link-lib';
import React, { ChildrenProp, EventHandler } from 'react';
import { Form as FinalForm, FormRenderProps } from 'react-final-form';

import { error } from '../../../../helpers/logging';
import { FormValues, SubmitHandler } from '../../../Action/views/EntryPoint/useSubmitHandler';
import { convertKeysAtoB } from '../../../Common/lib/data';
import { withFormLRS } from '../../hooks/useFormLRS';
import { InputValue, SubmissionErrors } from '../FormField/FormFieldTypes';

import FormBody from './FormBody';
import { FormTheme } from './FormContext';

export interface FormProps {
  action?: string;
  autofocusForm?: boolean;
  autoSubmit?: boolean;
  blacklist?: number[];
  className?: string;
  form?: any;
  formID?: string;
  formIRI?: SomeNode;
  initialValues?: any;
  method?: string;
  object?: SomeNode;
  onKeyUp?: EventHandler<any>;
  onSubmit?: SubmitHandler;
  sessionStore?: Storage;
  submissionErrors?: SubmissionErrors;
  subscription?: any;
  theme?: FormTheme;
  validateOnBlur?: boolean;
  whitelist?: number[];
}

const defaultProps = {
  method: 'post',
  theme: FormTheme.Default,
  validateOnBlur: false,
};

const mutators = {
  touchFields: (_: string, state: MutableState<Record<string, any>, Record<string, any>>) => {
    for (const field of Object.values(state.fields)) {
      field.touched = true;
    }
  },
};

const formDataFromValues = (values?: FormValues, formApi?: FormApi<FormValues>) => {
  let formData = {};

  if (formApi && values) {
    const registeredValues = formApi
      .getRegisteredFields()
      .reduce((res: Record<string, InputValue>, key: string) => {
        if (!Object.keys(values).includes(key)) {
          return res;
        }

        return {
          ...res,
          [key]: values[key],
        };
      }, {});

    formData = convertKeysAtoB(registeredValues);
  }

  return formData;
};

const Form: React.FC<FormProps & ChildrenProp> = (props) => {
  const {
    autoSubmit,
    form,
    formID,
    initialValues,
    onSubmit,
    subscription,
    validateOnBlur,
  } = props;
  const [autoSubmitted, setAutoSubmitted] = React.useState(false);
  const submitHandler = React.useCallback((values?: FormValues, formApi?: FormApi<FormValues>): Promise<any> => {
    if (!onSubmit) {
      return Promise.resolve();
    }

    const formData = formDataFromValues(values, formApi);

    return onSubmit(formData, formApi, () => onSubmit(formData, formApi)).catch(error);
  }, [onSubmit, sessionStorage, formID]);
  React.useEffect(() => {
    if (autoSubmit && !autoSubmitted) {
      setAutoSubmitted(true);
      submitHandler();
    }
  }, [autoSubmit, autoSubmitted]);

  const render = ({ handleSubmit, submitting }: FormRenderProps<FormValues>) => (
    <FormBody
      {...props}
      handleSubmit={handleSubmit}
      submitting={submitting}
    />
  );

  return (
    <FinalForm
      destroyOnUnregister
      form={form}
      initialValues={initialValues}
      initialValuesEqual={equal}
      key={formID}
      mutators={mutators}
      render={render}
      subscription={subscription}
      validateOnBlur={validateOnBlur}
      onSubmit={submitHandler}
    />
  );
};

Form.defaultProps = defaultProps;

export { Form as UnwrappedForm };

export default withFormLRS<FormProps>(Form);
