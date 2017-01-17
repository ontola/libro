import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';

import {
  Button,
  CardActions,
  CardContent,
  CardDivider,
  CardRow,
  FormField,
} from 'components';

const propTypes = {
  // From redux-form
  invalid: PropTypes.bool,
  // Since this uses redux-form, you need to pass onSubmit instead of handleSubmit.
  handleSubmit: PropTypes.func.isRequired,
  hasCancel: PropTypes.bool,
  submitting: PropTypes.bool.isRequired,
};

const defaultProps = {
  hasCancel: false,
};

/**
 * Should be rendered inside a card.
 * @returns {component} Component
 */
const SignInForm = ({
  handleSubmit,
  hasCancel,
  invalid,
  submitting,
}) =>
  <CardRow>
    <CardContent>
      <span>Log in met </span>
      <Button small margins icon="facebook" variant="facebook">
        Facebook
      </Button>
      <Button small margins icon="google" variant="google">
        Google
      </Button>
    </CardContent>
    <CardDivider text="of" />
    <form
      onSubmit={handleSubmit}
    >
      <Field
        autoComplete="Off"
        component={FormField}
        element="input"
        id="SignInEmail"
        label="Uw e-mailadres"
        name="email"
        placeholder="email@example.com"
        type="email"
        variant="material"
      />
      <CardActions noSpacing>
        {hasCancel &&
          <Button
            theme="box"
            icon="times"
          >
            Annuleren
          </Button>}
        <Button
          loading={submitting}
          disabled={invalid}
          type="submit"
          theme="box"
          icon="arrow-right"
        >
          Verder
        </Button>
      </CardActions>
    </form>
  </CardRow>;

SignInForm.propTypes = propTypes;
SignInForm.defaultProps = defaultProps;

const validate = (values) => {
  const errors = {};

  const email = values.get('email');

  if (!email) {
    errors.email = '* Vereist';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Ongeldig e-mailadres';
  }

  return errors;
};

const mapStateToProps = () => ({
  form: 'signIn',
  validate,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatch(`SOME_REGISTRATION_OR_SIGN_IN_ACTION ${values}`),
});

const SignInFormContainer = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  validate,
}
)(SignInForm));

export default SignInFormContainer;
