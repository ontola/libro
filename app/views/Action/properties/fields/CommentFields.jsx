import PropTypes from 'prop-types';
import React from 'react';
import { Field, formValueSelector, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';

import { argumentValidator } from '../../../../helpers/validators';
import FormField from '../../../../components/FormField/index';

const propTypes = {
  autoFocus: PropTypes.bool,
  form: PropTypes.string,
  onKeyUp: PropTypes.func,
};

const CommentField = ({ autoFocus, form, onKeyUp }) => {
  const formStyle = 'preview';

  return (
    <div>
      <Field
        rich
        autoFocus={autoFocus}
        component={FormField}
        id={`${form}-omniBody`}
        name="schema:text"
        placeholder="Plaats een reactie..."
        validate={argumentValidator.text}
        variant={formStyle}
        onKeyUp={onKeyUp}
      />
    </div>
  );
};

CommentField.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => ({
  currentValue: formValueSelector(ownProps.formName)(state, 'search'),
  form: ownProps.formName,
});

const CommentFieldContainer =
  connect(mapStateToProps)(reduxForm({
    destroyOnUnmount: false,
  })(CommentField));

export default CommentFieldContainer;
