import { isNamedNode, isNode } from '@ontologies/core';
import { FormApi } from 'final-form';
import { SomeNode } from 'link-lib';
import {
  Property,
  RenderStoreProvider,
  Resource,
  useDataInvalidation,
  useLRS,
  useResourceProperty,
} from 'link-redux';
import React, { EventHandler } from 'react';

import CardContent from '../../components/Card/CardContent';
import Form from '../../components/Form/Form';
import { SubmissionErrors } from '../../components/FormField';
import { LoadingGridContent } from '../../components/Loading';
import { entityIsLoaded } from '../../helpers/data';
import useInitialValues from '../../hooks/useInitialValues';
import ll from '../../ontology/ll';
import FormFooter from '../../topologies/FormFooter/Footer';

import { SubmitHandler } from './useSubmitHandler';

const subscription = {
  submitting: true,
};

interface PropTypes {
  action: SomeNode;
  actionBody: SomeNode;
  autoSubmit?: boolean;
  autofocusForm?: boolean;
  className?: string;
  contentWrapper?: any;
  footerButtons: (submitting: boolean) => React.ReactNode;
  formID: string;
  formInstance?: FormApi;
  httpMethod: string;
  object?: SomeNode;
  onKeyUp?: EventHandler<any>;
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
  const [errorResponse] = useResourceProperty(action, ll.errorResponse);
  const submissionErrorsTimeStamp = useDataInvalidation(isNode(errorResponse) ? errorResponse : undefined);
  const submissionErrors = React.useMemo<undefined | SubmissionErrors>(() => {
    if (isNode(errorResponse)) {
      const errs = lrs.tryEntity(errorResponse).reduce((acc: SubmissionErrors, triple) => {
        const key = btoa(triple.predicate.value);

        return {
          ...acc,
          [key]: (acc[key] || []).concat([{
            error: triple.object.value,
            index: 0,
          }]),
        };
      }, {});

      return errs;
    }

    return undefined;
  }, [errorResponse, submissionErrorsTimeStamp]);

  const renderBody = React.useCallback((submitting) => (
    <React.Fragment>
      <Property
        contentWrapper={contentWrapper}
        label={ll.actionBody}
      />
      {errorResponse && (
        <CardContent>
          <RenderStoreProvider value={lrs}>
            <Resource subject={errorResponse}/>
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
      autofocusForm={!!autofocusForm}
      autoSubmit={!!autoSubmit}
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
      onSubmit={onSubmit}
    >
      {renderBody}
    </Form>
  );
};

export default EntryPointForm;
