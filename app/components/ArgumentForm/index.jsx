import PropTypes from 'prop-types';
import React from 'react';
import { Field, formValueSelector, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';

import { argumentValidator } from '../../helpers/validators';
import Card, { CardActions } from '../Card';
import Button from '../Button';
import FormField from '../FormField';

const propTypes = {
  // Since this uses redux-form, you need to pass onSubmit instead of handleSubmit.
  handleSubmit: PropTypes.func.isRequired,
  // From redux-form
  invalid: PropTypes.bool,
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

  const formStyle = 'preview';

  return (
    <Card>
      <form
        className="Argumentform"
        onSubmit={handleSubmit}
      >
        <Field
          autoFocus
          autoComplete="Off"
          className={`Field--heading Field--${side}`}
          component={FormField}
          element="input"
          id={`Argument${side}Title`}
          name="name"
          placeholder={headingtext()}
          type="text"
          validate={argumentValidator.title}
          variant={formStyle}
        />
        <Field
          rich
          component={FormField}
          id={`Argument${side}Description`}
          placeholder="Toelichting (optioneel)..."
          validate={argumentValidator.text}
          variant={formStyle}
        />
        <CardActions noSpacing>
          <Button
            icon="times"
            theme="box"
          >
            Annuleren
          </Button>
          <Button
            disabled={invalid}
            icon="send"
            loading={submitting}
            theme="box"
            type="submit"
          >
            Opslaan
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

ArgumentForm.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
  const formName = `Argument-${ownProps.motionId}-${ownProps.side}`;

  return ({
    currentValue: formValueSelector(formName)(state, 'search'),
    form: formName,
  });
};

const mapDispatchToProps = () => ({
  onSubmit: values => console.log(values),
});

const ArgumentFormContainer =
  connect(mapStateToProps, mapDispatchToProps)(reduxForm({})(ArgumentForm));

export default ArgumentFormContainer;
