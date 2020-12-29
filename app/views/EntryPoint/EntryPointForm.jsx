import { isNamedNode } from '@ontologies/core';
import {
  Property,
  Resource,
  linkType,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import Form from '../../components/Form/Form';
import { LoadingGridContent } from '../../components/Loading';
import { entityIsLoaded } from '../../helpers/data';
import useInitialValues from '../../hooks/useInitialValues';
import ll from '../../ontology/ll';
import FormFooter from '../../topologies/FormFooter/Footer';

const subscription = {
  submitting: true,
};

const EntryPointForm = ({
  actionBody,
  autofocusForm,
  autoSubmit,
  className,
  contentWrapper,
  errorResponse,
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
    formID
  );
  const submissionErrorsTimeStamp = useDataInvalidation(errorResponse || actionBody);
  const submissionErrors = React.useMemo(() => {
    if (errorResponse) {
      const errs = lrs.tryEntity(errorResponse).reduce((acc, triple) => {
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

    return null;
  }, [errorResponse, submissionErrorsTimeStamp]);

  const renderBody = React.useCallback(({ submitting }) => (
    <React.Fragment>
      <Property
        contentWrapper={contentWrapper}
        label={ll.actionBody}
      />
      <FormFooter>
        <Property label={ll.actionBody} />
        {footerButtons ? footerButtons(submitting) : null}
      </FormFooter>
    </React.Fragment>
  ), [contentWrapper, footerButtons]);

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
      autofocusForm={autofocusForm}
      autoSubmit={autoSubmit}
      className={className}
      form={formInstance}
      formID={formID}
      formIRI={actionBody}
      initialValues={initialValues}
      method={httpMethod}
      object={object}
      sessionStore={sessionStore}
      submissionErrors={submissionErrors}
      submissionErrorsTimeStamp={submissionErrorsTimeStamp}
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

EntryPointForm.propTypes = {
  actionBody: linkType,
  autoSubmit: PropTypes.bool,
  autofocusForm: PropTypes.bool,
  className: PropTypes.string,
  contentWrapper: PropTypes.elementType,
  errorResponse: linkType,
  footerButtons: PropTypes.func,
  formID: PropTypes.string,
  formInstance: PropTypes.objectOf(PropTypes.any),
  httpMethod: PropTypes.string,
  object: linkType,
  onKeyUp: PropTypes.func,
  onSubmit: PropTypes.func,
  sessionStore: PropTypes.objectOf(PropTypes.any),
  theme: PropTypes.string,
  url: PropTypes.string,
  whitelist: PropTypes.arrayOf(PropTypes.number),
};

export default EntryPointForm;
