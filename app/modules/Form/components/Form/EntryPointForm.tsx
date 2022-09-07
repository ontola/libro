import { isNamedNode } from '@ontologies/core';
import { FormApi } from 'final-form';
import { SomeNode } from 'link-lib';
import {
  Property,
  RenderStoreProvider,
  Resource,
  useIds,
  useLRS,
  useTempClones,
} from 'link-redux';
import React, { EventHandler, SyntheticEvent } from 'react';

import useSubmissionErrors from '../../../Action/views/EntryPoint/useSubmissionErrors';
import { SubmitHandler } from '../../../Action/views/EntryPoint/useSubmitHandler';
import { LoadingGridContent } from '../../../Common/components/Loading';
import { entityIsLoaded } from '../../../Kernel/lib/data';
import ll from '../../../Kernel/ontology/ll';
import { useDependencies } from '../../hooks/useDependencies';
import useInitialValues from '../../hooks/useInitialValues';

import Form from './Form';
import { FormBodyRenderer } from './FormBody';
import { FormTheme } from './FormContext';

const subscription = {
  submitting: true,
};

export interface CalculatedEntryPointProps {
  action?: SomeNode;
  actionBody?: SomeNode;
  formID: string;
  httpMethod?: string;
  object?: SomeNode;
  onSubmit?: SubmitHandler;
  url?: string;
}

export interface ProvidedEntryPointProps {
  autoSubmit: boolean;
  autofocusForm: boolean;
  blacklist?: number[];
  className?: string;
  Wrapper: React.ElementType;
  formID: string;
  footer?: (submitting: boolean | undefined) => React.ReactNode;
  formInstance?: FormApi;
  onKeyUp?: EventHandler<SyntheticEvent<unknown>>;
  onLoad?: () => React.ReactNode;
  sessionStore: Storage;
  theme?: FormTheme;
  whitelist?: number[];
}

export type EntryPointFormProps = CalculatedEntryPointProps & ProvidedEntryPointProps;

const EntryPointForm: React.FC<EntryPointFormProps> = ({
  action,
  actionBody,
  autofocusForm,
  autoSubmit,
  blacklist,
  className,
  Wrapper,
  footer,
  formID,
  formInstance,
  httpMethod,
  object,
  onKeyUp,
  onLoad,
  onSubmit,
  sessionStore,
  theme,
  url,
  whitelist,
}) => {
  const lrs = useLRS();
  const [loading, objectDependencies] = useDependencies(
    sessionStore,
    actionBody,
    object,
    formID,
  );

  // Ensure we can modify the object to persist fields while editing, without changing global state.
  const [clonedObject] = useTempClones(objectDependencies);

  const initialValues = useInitialValues(
    loading,
    sessionStore,
    actionBody,
    clonedObject,
    formID,
  );
  const [errorResponse] = useIds(action, ll.errorResponse);
  const [submissionErrors, clearErrors] = useSubmissionErrors(errorResponse);

  const handleSubmit = React.useCallback<SubmitHandler>((formData, formApi, retrySubmit) => {
    clearErrors();

    if (!onSubmit) {
      throw new Error(`No submit handler provided for ${action?.value}`);
    }

    return onSubmit(formData, formApi, retrySubmit);
  }, [clearErrors]);
  const renderBody = React.useCallback<FormBodyRenderer>((submitting) => (
    <React.Fragment>
      <Wrapper>
        <Property
          label={ll.actionBody}
        />
        {errorResponse && (
          <RenderStoreProvider value={lrs}>
            <Resource subject={errorResponse} />
          </RenderStoreProvider>
        )}
      </Wrapper>
      {footer ? footer(httpMethod != 'GET' && submitting) : null}
    </React.Fragment>
  ), [footer, errorResponse]);

  if (loading) {
    if (isNamedNode(loading) && !entityIsLoaded(lrs, loading)) {
      return (
        <Resource
          subject={loading}
          onLoad={onLoad ?? LoadingGridContent}
        />
      );
    }

    if (onLoad) {
      return (
        <React.Fragment>
          {onLoad()}
        </React.Fragment>
      );
    }

    return <LoadingGridContent />;
  }

  return (
    <Form
      action={url && new URL(url).pathname}
      autoSubmit={autoSubmit}
      autofocusForm={autofocusForm}
      blacklist={blacklist}
      className={className}
      form={formInstance}
      formID={formID}
      formIRI={actionBody}
      initialValues={initialValues}
      method={httpMethod}
      object={clonedObject}
      sessionStore={sessionStore}
      submissionErrors={submissionErrors}
      subscription={subscription}
      theme={theme}
      whitelist={whitelist}
      onKeyUp={onKeyUp}
      onSubmit={handleSubmit}
    >
      {renderBody}
    </Form>
  );
};

EntryPointForm.defaultProps = {
  Wrapper: React.Fragment,
};

export default EntryPointForm;

