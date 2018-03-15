import React from 'react';
import { Field, formValueSelector, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';

import { argumentValidator } from '../../helpers/validators';
import FormField from '../FormField';

const CommentField = () => {
  const formStyle = 'preview';

  return (
    <div>
      <Field
        rich
        component={FormField}
        id="omniBody"
        name="text"
        placeholder="Plaats een reactie..."
        validate={argumentValidator.text}
        variant={formStyle}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  currentValue: formValueSelector(ownProps.formName)(state, 'search'),
  form: ownProps.formName,
});

const CommentFieldContainer =
  connect(mapStateToProps)(reduxForm({
    destroyOnUnmount: false,
  })(CommentField));

export default CommentFieldContainer;
