import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'redux-form/immutable';

import {
  Button,
  CardLink,
  HiddenFormField,
  FormField,
  Input,
} from '../../components';
import validators from '../../helpers/validators';
import { STEPS } from '../../state/form/reducer';

const propTypes = {
  hasBack: PropTypes.bool,
  reason: PropTypes.string,
  registeredEmail: PropTypes.string,
  step: PropTypes.string,
  stepBack: PropTypes.func,
};

/**
 * Should be rendered inside a card.
 * @returns {component} Component
 */
class SignInFormBase extends React.PureComponent {
  static emailField() {
    return (
      <Field
        autoComplete="off"
        component={FormField}
        element="input"
        id="SignInEmail"
        label="Uw e-mailadres"
        name="email"
        placeholder="email@example.com"
        type="email"
        validate={[
          validators.required,
          validators.isEmail,
        ]}
        variant="material"
      />
    );
  }

  static signInFields() {
    return (
      <React.Fragment>
        {this.emailField()}
        <Field
          autoComplete="off"
          component={FormField}
          element="input"
          id="SignInPassword"
          label="Jouw wachtwoord"
          name="password"
          type="password"
          variant="material"
        />
        <Field
          component={HiddenFormField}
          id="r"
          name="r"
        />
      </React.Fragment>
    );
  }

  static confirmFields() {
    return (
      <React.Fragment>
        {this.emailField()}
        <Field
          hiddenValue
          component={Input}
          element="input"
          id="SignUpTerms"
          name="acceptTerms"
          type="hidden"
        />
        <p>Door je te registreren ga je akkoord met de
          <CardLink to="/policy" > algemene voorwaarden </CardLink>
          en de
          <CardLink to="/privacy"> privacy policy</CardLink>.
        </p>
      </React.Fragment>
    );
  }

  backButton() {
    if (!this.props.hasBack) {
      return null;
    }

    return (
      <Button
        icon="arrow-left"
        theme="box"
        onClick={this.props.stepBack}
      >
        Terug
      </Button>
    );
  }

  registerFields() {
    return (
      <React.Fragment>
        <p>{this.props.reason}</p>
        {this.constructor.emailField()}
        <Field
          component={Input}
          element="input"
          hiddenValue=""
          id="SignInPassword"
          name="password"
          type="hidden"
        />
        <Field
          component={HiddenFormField}
          id="r"
          name="r"
        />
      </React.Fragment>
    );
  }

  signUpCompleted() {
    return (
      <React.Fragment>
        <p style={{ border: '1px solid #863d3d' }}>
          Vergeet niet je stem te bevestigen door op de link te klikken die we je hebben gemaild
          naar <b>{this.props.registeredEmail}</b>
        </p>
      </React.Fragment>
    );
  }

  currentFields() {
    let buttonText, formFields;
    switch (this.props.step) {
      case STEPS.confirm:
        formFields = this.constructor.confirmFields();
        buttonText = 'Bevestig';
        break;
      case STEPS.signIn:
        formFields = this.constructor.signInFields();
        buttonText = 'Verder';
        break;
      case STEPS.signUp:
        formFields = this.registerFields();
        buttonText = 'Ga verder';
        break;
      case STEPS.signUpCompleted:
        formFields = this.signUpCompleted();
        buttonText = null;
        break;
      default:
        // TODO: bugsnag
        buttonText = 'Onverwachtse staat';
    }

    return { buttonText, formFields };
  }

  render() {
    return null;
  }
}

SignInFormBase.propTypes = propTypes;

export default SignInFormBase;
