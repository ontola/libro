import PropTypes from 'prop-types';
import React from 'react';
import {
  Field,
  FormSection,
  formValueSelector,
  reduxForm,
} from 'redux-form/immutable';
import { connect } from 'react-redux';

import { FormField, Input } from '../../../../components';

const propTypes = {
  form: PropTypes.string,
  // From redux-form
  side: PropTypes.oneOf(['pro', 'con']).isRequired,
};

const BlogPostFields = ({
  form,
  side,
}) => {
  const formStyle = 'preview';

  return (
    <div>
      <Field
        autoFocus
        autoComplete="off"
        className={`Field--heading Field--${side}`}
        component={FormField}
        element="input"
        id={`${form}-omniTitle`}
        name="schema:name"
        placeholder="Plaats de kern van de update"
        type="text"
        variant={formStyle}
      />
      <Field
        rich
        component={FormField}
        id={`${form}-omniBody`}
        name="schema:text"
        placeholder="Licht je update hier toe..."
        variant={formStyle}
      />
      <FormSection name="argu:happening">
        <Field
          component={Input}
          hiddenValue={new Date().toISOString()}
          id={`${form}-argu:happenedAt`}
          name="argu:happenedAt"
          type="hidden"
        />
      </FormSection>
    </div>
  );
};

BlogPostFields.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => ({
  currentValue: formValueSelector(ownProps.formName)(state, 'search'),
  form: ownProps.formName,
});

const BlogPostFieldsContainer =
  connect(mapStateToProps)(reduxForm({
    destroyOnUnmount: false,
  })(BlogPostFields));

export default BlogPostFieldsContainer;
