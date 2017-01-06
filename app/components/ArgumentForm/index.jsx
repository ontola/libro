import './ArgumentForm.scss';
import React, { PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { connect } from 'react-redux';

import Argument from '../../models/Argument';
import {
  Card,
  CardActions,
  Button,
  FormField,
} from 'components';

const propTypes = {
  // From redux-form
  invalid: PropTypes.bool,
  // Since this uses redux-form, you need to pass onSubmit instead of handleSubmit.
  handleSubmit: PropTypes.func.isRequired,
  side: PropTypes.oneOf(['pro', 'con']).isRequired,
  submitting: PropTypes.bool.isRequired,
};

const ArgumentForm = ({
  handleSubmit,
  invalid,
  side,
  submitting,
}) => {
  const headingtext = () => {
    if (side === 'pro') {
      return 'Kern van voordeel...';
    }
    return 'Kern van probleem...';
  };

  return (
    <Card>
      <form
        onSubmit={handleSubmit}
        className="Argumentform"
      >
        <Field
          autoComplete="Off"
          id={`Argument${side}Title`}
          name="name"
          placeholder={headingtext()}
          className={`Field--heading Field--preview Field--${side}`}
          element="input"
          component={FormField}
          type="text"
        />
        <Field
          id={`Argument${side}Description`}
          name="text"
          placeholder="Toelichting (optioneel)..."
          className="Field--textarea Field--preview"
          component={FormField}
          rows={3}
          element="textArea"
        />
        <CardActions noSpacing>
          <Button
            theme="box"
            icon="times"
          >
            Annuleren
          </Button>
          <Button
            loading={submitting}
            disabled={invalid}
            type="submit"
            theme="box"
            icon="send"
          >
            Opslaan
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

ArgumentForm.propTypes = propTypes;

const validate = (values) => {
  const errors = {};
  const MAX_TITLE_LENGTH = 75;
  const MIN_TITLE_LENGTH = 5;
  const MAX_BODY_LENGTH = 5000;

  const name = values.get('name');
  const text = values.get('text');

  if (!name) {
    errors.name = 'Vereist';
  } else if (name.length > MAX_TITLE_LENGTH) {
    errors.name = 'Te lang';
  } else if (name.length < MIN_TITLE_LENGTH) {
    errors.name = 'Te kort';
  }
  if (text) {
    if (text.length > MAX_BODY_LENGTH) {
      errors.text = 'Te lang';
    }
  }
  return errors;
};

const mapStateToProps = (state, ownProps) => {
  const formName = `Argument-${ownProps.motionId}-${ownProps.side}`;

  return ({
    currentValue: formValueSelector(formName)(state, 'search'),
    form: formName,
    validate,
  });
};

const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatch(Argument.create(values, { href: '/lr/2/arguments' })),
});

const ArgumentFormContainer = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  validate,
}
)(ArgumentForm));

export default ArgumentFormContainer;
