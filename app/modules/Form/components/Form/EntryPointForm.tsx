import { isNamedNode } from '@ontologies/core';
import { FormApi } from 'final-form';
import { SomeNode } from 'link-lib';
import {
  Property,
  RenderStoreProvider,
  Resource,
  useIds,
  useLRS,
} from 'link-redux';
import React, { EventHandler, SyntheticEvent } from 'react';

import ll from '../../../../ontology/ll';
import useSubmissionErrors from '../../../Action/views/EntryPoint/useSubmissionErrors';
import { SubmitHandler } from '../../../Action/views/EntryPoint/useSubmitHandler';
import { entityIsLoaded } from '../../../Core/lib/data';
import { LoadingGridContent } from '../../../Core/components/Loading';
import useInitialValues from '../../hooks/useInitialValues';

import Form from './Form';
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
  footer?: (submitting: boolean) => React.ReactNode;
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
  const [loading, initialValues, version] = useInitialValues(
    sessionStore,
    actionBody,
    object,
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
  const renderBody = React.useCallback((submitting) => (
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
      {footer ? footer(submitting) : null}
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
      key={`version-${version}`}
      method={httpMethod}
      object={object}
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

