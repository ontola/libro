import './ArgumentForm.scss';
import React, { PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

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

// This is just for testing purposes
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const SERVER_LATENCY = 1000;
function submit(values) {
  return sleep(SERVER_LATENCY)
    .then(() => {
      console.log(values);
      if (['hitler', 'kutten'].includes(values.get('title'))) {
        throw new SubmissionError({ title: 'Dat mag nie!' });
      } else {
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
      }
    });
}
// End test

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
        onSubmit={handleSubmit(submit)}
        className="Argumentform"
      >
        <Field
          autoComplete="Off"
          id={`Argument${side}Title`}
          name="title"
          placeholder={headingtext()}
          className={`Field--heading Field--preview Field--${side}`}
          element="input"
          component={FormField}
          type="text"
        />
        <Field
          id={`Argument${side}Description`}
          name="description"
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

  const title = values.get('title');
  const description = values.get('description');

  if (!title) {
    errors.title = 'Vereist';
  } else if (title.length > MAX_TITLE_LENGTH) {
    errors.title = 'Te lang';
  } else if (title.length < MIN_TITLE_LENGTH) {
    errors.title = 'Te kort';
  }
  if (description) {
    if (description.length > MAX_BODY_LENGTH) {
      errors.description = 'Te lang';
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

const mapDispatchToProps = () => ({
  onSubmit: (values) => {
    console.log(values);
  },
});

const ArgumentFormContainer = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  validate,
}
)(ArgumentForm));

export default ArgumentFormContainer;
