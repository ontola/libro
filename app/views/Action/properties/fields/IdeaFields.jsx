import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, formValueSelector, reduxForm } from 'redux-form/immutable';

import {
  Button,
  FileInput,
  FormField,
} from '../../../../components';
import { Input } from '../../../../components/Input';

const propTypes = {
  form: PropTypes.string,
};

const childPropTypes = {
  fields: PropTypes.shape({
    name: PropTypes.string,
  }),
  meta: PropTypes.shape({
    error: PropTypes.string,
    submitFailed: PropTypes.bool,
  }),
};

const renderAttachments = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    {fields.map((member, index) => (
      <li key={member}>
        <Button
          icon="close"
          theme="box"
          onClick={() => fields.remove(index)}
        />
        <Field
          component={FileInput}
          id={`${member}.schema:contentUrl`}
          name={`${member}.schema:contentUrl`}
          placeholder="Beschrijving"
          type="file"
        />
      </li>
    ))}
    <li>
      <Button icon="plus" theme="box" onClick={() => fields.push(new Map())}>
        Add Attachment
      </Button>
      {submitFailed && error && <span>{error}</span>}
    </li>
  </ul>
);

renderAttachments.propTypes = childPropTypes;

const IdeaFields = ({
  form,
}) => {
  const formStyle = 'preview';

  return (
    <div>
      <Field
        autoFocus
        autoComplete="off"
        className="Field--heading"
        component={FormField}
        element="input"
        id={`${form}-omniTitle`}
        name="schema:name"
        placeholder="Plaats de kern van het idee"
        type="text"
        variant={formStyle}
      />
      <Field
        rich
        component={FormField}
        id={`${form}-omniBody`}
        name="schema:text"
        placeholder="Licht je idee hier toe..."
        variant={formStyle}
      />
      <FieldArray component={renderAttachments} name="argu:attachments" />
      <Field
        component={Input}
        hiddenValue="false"
        name="argu:edge.argu:arguPublication.argu:draft"
        type="hidden"
      />
    </div>
  );
};

IdeaFields.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => ({
  currentValue: formValueSelector(ownProps.formName)(state, 'search'),
  form: ownProps.formName,
});

const IdeaFieldsContainer =
  connect(mapStateToProps)(reduxForm({
    destroyOnUnmount: false,
  })(IdeaFields));

export default IdeaFieldsContainer;
