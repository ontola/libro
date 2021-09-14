import equal from 'fast-deep-equal';
import React, { FormEventHandler } from 'react';

import { isFunction } from '../../helpers/types';
import { FileStore, StoreFile } from '../../hooks/useFileStore';
import Input, { InputType } from '../Input/Input';

import { FormContext, FormProps } from './Form';

interface FormBodyProps extends FormProps {
  children?: React.ReactNode;
  fileStore?: FileStore;
  handleSubmit?: FormEventHandler<HTMLFormElement>;
  storeFile?: StoreFile;
  submitting?: boolean;
}

const FormBody = ({
  action,
  autofocusForm,
  blacklist,
  children,
  className,
  fileStore,
  formID,
  formIRI,
  handleSubmit,
  method,
  object,
  onKeyUp,
  sessionStore,
  storeFile,
  submissionErrors,
  submitting,
  theme,
  whitelist,
}: FormBodyProps): JSX.Element => {
  const lowerMethod = method?.toLowerCase();
  const methodInput = lowerMethod && !['get', 'post'].includes(lowerMethod) && (
    <Input
      name="_method"
      type={InputType.Hidden}
      value={method}
    />
  );
  const formMethod = lowerMethod === 'get' ? 'get' : 'post';
  const nextContext = {
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
    submitting,
    theme,
    whitelist,
  };
  const [context, setContext] = React.useState<Partial<FormContext>>(nextContext);
  React.useEffect(() => {
    if (!equal(context, nextContext)) {
      setContext(nextContext);
    }
  });

  return (
    <FormContext.Provider value={context}>
      <form
        action={action}
        className={className ?? 'Form'}
        data-testid={formID}
        method={formMethod}
        onSubmit={handleSubmit}
      >
        {isFunction(children) && children(submitting)}
        {methodInput}
      </form>
    </FormContext.Provider>
  );
};

export default FormBody;
