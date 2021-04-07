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
import React, { EventHandler, SyntheticEvent } from 'react';

import CardContent from '../../components/Card/CardContent';
import Form from '../../components/Form/Form';
import { LoadingGridContent } from '../../components/Loading';
import { entityIsLoaded } from '../../helpers/data';
import useInitialValues from '../../hooks/useInitialValues';
import ll from '../../ontology/ll';
import FormFooter from '../../topologies/FormFooter/Footer';

import useSubmissionErrors from './useSubmissionErrors';
import { SubmitHandler } from './useSubmitHandler';

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
  contentWrapper?: React.ReactNode;
  footerButtons: (submitting: boolean) => React.ReactNode;
  formID: string;
  formInstance?: FormApi;
  httpMethod: string;
  object?: SomeNode;
  onKeyUp?: EventHandler<SyntheticEvent<unknown>>;
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
  contentWrapper,
  footerButtons,
  formID,
  formInstance,
  httpMethod,
  object,
  onKeyUp,
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
        contentWrapper={contentWrapper}
        label={ll.actionBody}
      />
      {errorResponse && (
        <CardContent>
          <RenderStoreProvider value={lrs}>
            <Resource subject={errorResponse} />
          </RenderStoreProvider>
        </CardContent>
      )}
      <FormFooter>
        <Property label={ll.actionBody} />
        {footerButtons ? footerButtons(submitting) : null}
      </FormFooter>
    </React.Fragment>
  ), [contentWrapper, footerButtons, errorResponse]);

  if (loading) {
    return (
      <CardContent>
        {isNamedNode(loading) && !entityIsLoaded(lrs, loading)
          ? <Resource subject={loading} onLoad={LoadingGridContent} />
          : <LoadingGridContent />}
      </CardContent>
    );
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
