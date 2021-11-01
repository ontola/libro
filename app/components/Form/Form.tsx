import equal from 'fast-deep-equal';
import { FormApi } from 'final-form';
import { SomeNode } from 'link-lib';
import React, { EventHandler } from 'react';
import { Form as FinalForm, FormRenderProps } from 'react-final-form';

import { convertKeysAtoB } from '../../helpers/data';
import { error } from '../../helpers/logging';
import useFileStore, {
  FileStore,
  StoreFile,
} from '../../hooks/useFileStore';
import { InputValue } from '../../hooks/useFormField';
import { withFormLRS } from '../../hooks/useFormLRS';
import { FormValues, SubmitHandler } from '../../views/EntryPoint/useSubmitHandler';
import { SubmissionErrors } from '../FormField';

import FormBody from './FormBody';

export enum FormTheme {
  Default = 'default',
  Flow = 'flow',
  Preview = 'preview',
}

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

export interface FormContext {
  autofocusForm: boolean;
  blacklist?: number[];
  fileStore: FileStore;
  formID: string;
  formIRI: SomeNode;
  formSection?: string;
  object?: SomeNode;
  onKeyUp?: EventHandler<any>;
  parentObject?: SomeNode;
  sessionStore?: Storage;
  submissionErrors?: SubmissionErrors;
  storeFile?: StoreFile;
  submitting?: boolean;
  theme?: FormTheme;
  whitelist?: number[];
}

export const FormContext = React.createContext<Partial<FormContext>>({});

const formDataFromValues = (values?: FormValues, formApi?: FormApi<FormValues>, fileStore?: FileStore) => {
  let formData = {};

  if (formApi && values && fileStore) {
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

    formData = convertKeysAtoB(registeredValues, fileStore);
  }

  return formData;
};

const Form: React.FC<FormProps> = (props) => {
  const {
    autoSubmit,
    form,
    formID,
    initialValues,
    onSubmit,
    subscription,
    validateOnBlur,
  } = props;
  const [storeFile, fileStore] = useFileStore();
  const [autoSubmitted, setAutoSubmitted] = React.useState(false);
  const submitHandler = React.useCallback((values?: FormValues, formApi?: FormApi<FormValues>): Promise<any> => {
    if (!onSubmit) {
      return Promise.resolve();
    }

    const formData = formDataFromValues(values, formApi, fileStore);

    return onSubmit(formData, formApi, () => onSubmit(formData, formApi)).catch(error);
  }, [onSubmit, sessionStorage, formID, fileStore]);
  React.useEffect(() => {
    if (autoSubmit && !autoSubmitted) {
      setAutoSubmitted(true);
      submitHandler();
    }
  }, [autoSubmit, autoSubmitted]);

  const render = ({ handleSubmit, submitting }: FormRenderProps<FormValues>) => (
    <FormBody
      {...props}
      fileStore={fileStore}
      handleSubmit={handleSubmit}
      storeFile={storeFile}
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
