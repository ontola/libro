import { isNamedNode } from '@ontologies/core';
import { FormApi } from 'final-form';
import { SomeNode } from 'link-lib';
import {
  Property,
  RenderStoreProvider,
  Resource,
  useLRS,
  useResourceProperty,
} from 'link-redux';
import React, {
  EventHandler,
  SyntheticEvent,
} from 'react';

import { LoadingGridContent } from '../Loading';
import { entityIsLoaded } from '../../helpers/data';
import useInitialValues from '../../hooks/useInitialValues';
import ll from '../../ontology/ll';
import useSubmissionErrors from '../../views/EntryPoint/useSubmissionErrors';
import { SubmitHandler } from '../../views/EntryPoint/useSubmitHandler';

import Form from './Form';

const subscription = {
  submitting: true,
};

interface PropTypes {
  action: SomeNode;
  actionBody: SomeNode;
  autoSubmit?: boolean;
  autofocusForm?: boolean;
  blacklist?: number[];
  className?: string;
  footer: (submitting: boolean) => React.ReactNode;
  formID: string;
  formInstance?: FormApi;
  httpMethod: string;
  object?: SomeNode;
  onKeyUp?: EventHandler<SyntheticEvent<unknown>>;
  onLoad?: () => React.ReactNode;
  onSubmit: SubmitHandler;
  sessionStore?: Storage;
  theme?: string;
  url: string;
  whitelist?: number[];
}

const EntryPointForm: React.FC<PropTypes> = ({
  action,
  actionBody,
  autofocusForm,
  autoSubmit,
  blacklist,
  className,
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
  const [loading, initialValues] = useInitialValues(
    sessionStore,
    actionBody,
    object,
    formID,
  );
  const [errorResponse] = useResourceProperty(action, ll.errorResponse) as SomeNode[];
  const [submissionErrors, clearErrors] = useSubmissionErrors(errorResponse);
  const handleSubmit = React.useCallback<SubmitHandler>((formData, formApi, retrySubmit) => {
    clearErrors();

    return onSubmit(formData, formApi, retrySubmit);
  }, [clearErrors]);
  const renderBody = React.useCallback((submitting) => (
    <React.Fragment>
      <Property
        label={ll.actionBody}
      />
      {errorResponse && (
        <RenderStoreProvider value={lrs}>
          <Resource subject={errorResponse} />
        </RenderStoreProvider>
      )}
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
      autoSubmit={!!autoSubmit}
      autofocusForm={!!autofocusForm}
      blacklist={blacklist}
      className={className}
      form={formInstance}
      formID={formID}
      formIRI={actionBody}
      initialValues={initialValues}
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

export default EntryPointForm;
