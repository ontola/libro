import {
  Property,
  linkType,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { LoadingGridContent } from '../../components/Loading';
import FormContainer from '../../containers/Form';
import useInitialValues from '../../hooks/useInitialValues';
import ll from '../../ontology/ll';
import { CardContent } from '../../topologies/Card';
import FormFooter from '../../topologies/FormFooter/Footer';

const EntryPointForm = ({
  actionBody,
  autofocusForm,
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
  const submissionErrorsTimeStamp = useDataInvalidation(errorResponse);
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

  if (loading) {
    return <CardContent><LoadingGridContent /></CardContent>;
  }

  return (
    <FormContainer
      action={url && new URL(url).pathname}
      className={className}
      form={formInstance}
      formID={formID}
      initialValues={initialValues}
      method={httpMethod}
      object={object}
      submissionErrorsTimeStamp={submissionErrorsTimeStamp}
      subscription={{
        submitting: true,
      }}
      onSubmit={onSubmit}
    >
      {({ submitting }) => (
        <React.Fragment>
          <Property
            autofocusForm={autofocusForm}
            contentWrapper={contentWrapper}
            formIRI={actionBody}
            label={ll.actionBody}
            object={object}
            sessionStore={sessionStore}
            submissionErrors={submissionErrors}
            theme={theme}
            whitelist={whitelist}
            onKeyUp={onKeyUp}
          />
          <FormFooter>
            <Property
              formIRI={actionBody}
              label={ll.actionBody}
              object={object}
              sessionStore={sessionStore}
              onKeyUp={onKeyUp}
            />
            {footerButtons ? footerButtons(submitting) : null}
          </FormFooter>
        </React.Fragment>
      )}
    </FormContainer>
  );
};

EntryPointForm.propTypes = {
  actionBody: linkType,
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
