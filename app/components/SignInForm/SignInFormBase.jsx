import PropTypes from 'prop-types';
import React from 'react';

import validators, { combineValidators } from '../../helpers/validators';
import { STEPS } from '../../state/form/reducer';
import Button from '../Button';
import { CardContent, CardLink, CardRow } from '../Card';
import FormField from '../FormField';
import CloseableContainer from '../../containers/CloseableContainer';

const propTypes = {
  hasBack: PropTypes.bool,
  initialValues: PropTypes.objectOf(PropTypes.string),
  r: PropTypes.string,
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
      <FormField
        autoComplete="off"
        field={btoa('email')}
        key="email"
        label="Uw e-mailadres"
        placeholder="email@example.com"
        type="email"
        validate={combineValidators(
          validators.required,
          validators.isEmail
        )}
      />
    );
  }

  confirmFields() {
    return (
      <CardRow>
        <CardContent>
          <p>Door je te registreren ga je akkoord met de
            <CardLink to="/policy"> algemene voorwaarden </CardLink>
            en de
            <CardLink to="/privacy"> privacy policy</CardLink>.
          </p>
          {this.constructor.emailField()}
          <FormField
            defaultValue="true"
            field={btoa('acceptTerms')}
            initialValue="true"
            key="acceptTerms"
            type="hidden"
            value="true"
          />
          {this.redirectField()}
        </CardContent>
      </CardRow>
    );
  }

  redirectField() {
    return (
      <FormField
        field={btoa('r')}
        initialValue={this.props.initialValues.r || this.props.r}
        key="r"
        type="hidden"
      />
    );
  }

  signInFields() {
    return (
      <CardRow>
        <CardContent>
          {this.constructor.emailField()}
          <FormField
            autoComplete="off"
            field={btoa('password')}
            key="password"
            label="Jouw wachtwoord"
            type="password"
          />
          {this.redirectField()}
        </CardContent>
      </CardRow>
    );
  }

  backButton() {
    if (!this.props.hasBack) {
      return null;
    }

    return (
      <Button
        icon="arrow-left"
        theme="transparant"
        onClick={this.props.stepBack}
      >
        Terug
      </Button>
    );
  }

  registerFields() {
    return (
      <CardRow>
        <CardContent>
          <p>{this.props.reason}</p>
          {this.constructor.emailField()}
          <FormField
            field={btoa('password')}
            key="password"
            type="hidden"
          />
          {this.redirectField()}
        </CardContent>
      </CardRow>
    );
  }

  signUpCompleted() {
    return (
      <CloseableContainer id="ConfirmEmail">
        <CardRow>
          <CardContent>
            <p>
              Vergeet niet je stem te bevestigen door op de link te klikken die we je hebben gemaild
              naar <b>{this.props.registeredEmail}</b>
            </p>
          </CardContent>
        </CardRow>
      </CloseableContainer>
    );
  }

  currentFields() {
    let buttonText, formFields;
    switch (this.props.step) {
      case STEPS.confirm:
        formFields = this.confirmFields();
        buttonText = 'Bevestig';
        break;
      case STEPS.signIn:
        formFields = this.signInFields();
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

    return {
      buttonText,
      formFields,
    };
  }

  render() {
    return null;
  }
}

SignInFormBase.propTypes = propTypes;

export default SignInFormBase;
