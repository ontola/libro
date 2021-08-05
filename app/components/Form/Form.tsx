import equal from 'fast-deep-equal';
import { FormApi } from 'final-form';
import { SomeNode } from 'link-lib';
import React, { EventHandler } from 'react';
import { Form as FinalForm } from 'react-final-form';

import { convertKeysAtoB } from '../../helpers/data';
import { error } from '../../helpers/logging';
import { isFunction } from '../../helpers/types';
import useFileStore, {
  FileStore,
  StoreFile,
} from '../../hooks/useFileStore';
import { InputValue } from '../../hooks/useFormField';
import { withFormLRS } from '../../hooks/useFormLRS';
import { FormValues, SubmitHandler } from '../../views/EntryPoint/useSubmitHandler';
import { SubmissionErrors } from '../FormField';
import Input, { InputType } from '../Input/Input';

export enum FormTheme {
  Default = 'default',
  Flow = 'flow',
  Preview = 'preview',
}

interface FormProps {
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
    action,
    autofocusForm,
    autoSubmit,
    blacklist,
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
  const context = React.useMemo(() => ({
    autofocusForm,
    blacklist,
    fileStore,
    formID,
    formIRI,
    formSection: undefined,
    object,
    onKeyUp,
    parentObject: undefined,
    sessionStore,
    storeFile,
    submissionErrors,
    theme,
    whitelist,
  }), [
    autofocusForm,
    blacklist,
    fileStore,
    formID,
    formIRI,
    object,
    onKeyUp,
    sessionStore,
    storeFile,
    submissionErrors,
    theme,
    whitelist,
  ]);

  const lowerMethod = method?.toLowerCase();
  const methodInput = lowerMethod && !['get', 'post'].includes(lowerMethod) && (
    <Input
      name="_method"
      type={InputType.Hidden}
      value={method}
    />
  );
  const formMethod = lowerMethod === 'get' ? 'get' : 'post';
  const render = React.useCallback(({ handleSubmit, submitting }) => (
    <FormContext.Provider value={context}>
      <form
        action={action}
        className={className || 'Form'}
        data-testid={formID}
        method={formMethod}
        onSubmit={handleSubmit}
      >
        {isFunction(children) && children(submitting)}
        {methodInput}
      </form>
    </FormContext.Provider>
  ), [action, className, formID, formMethod, children, methodInput, context]);

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

export default withFormLRS<FormProps>(Form);
