import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '../Button';
import FormField from '../../containers/FormField';
import CloseableContainer from '../../containers/CloseableContainer';
import { handle } from '../../helpers/logging';
import validators, { combineValidators } from '../../helpers/validators';
import app from '../../ontology/app';
import {
  CardContent,
  CardLink,
  CardRow,
} from '../../topologies/Card';
import { STEPS } from '../../state/form/reducer';
import messages from '../../state/form/messages';

const propTypes = {
  errors: PropTypes.instanceOf(Map),
  hasBack: PropTypes.bool,
  initialValues: PropTypes.objectOf(PropTypes.string),
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
  r: PropTypes.string,
  reason: PropTypes.element,
  registeredEmail: PropTypes.string,
  step: PropTypes.string,
  stepBack: PropTypes.func,
};

/**
 * Should be rendered inside a card.
 * @returns {component} Component
 */
class SignInFormBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.fieldSettings = {};
    Object.values(STEPS).forEach((s) => {
      this.fieldSettings[s] = {
        emailField: {
          autofocus: false,
        },
      };
    });
  }

  errorsForField(fieldName) {
    return this.props.errors.get(btoa(fieldName))?.map((msg) => this.props.intl.formatMessage(msg));
  }

  confirmFields() {
    return (
      <CardRow>
        <CardContent>
          <p>Door je te registreren ga je akkoord met de
            <CardLink to={app.policy}> algemene voorwaarden </CardLink>
            en de
            <CardLink to={app.privacy}> privacy policy</CardLink>.
          </p>
          {this.emailField()}
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

  emailField() {
    return (
      <FormField
        required
        autofocus={this.fieldSettings[this.props.step].emailField.autofocus}
        customErrors={this.errorsForField('email')}
        field={btoa('email')}
        key="email"
        label={(
          <FormattedMessage
            defaultMessage="Your email address"
            id="https://app.argu.co/i18n/forms/session/email/label"
          />
        )}
        placeholder={this.props.intl.formatMessage(messages.emailPlaceholder)}
        type="email"
        validate={combineValidators(
          validators.required,
          validators.isEmail
        )}
      />
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
          {this.emailField()}
          <FormField
            autofocus
            autoComplete="off"
            customErrors={this.errorsForField('password')}
            field={btoa('password')}
            key="password"
            label={(
              <FormattedMessage
                defaultMessage="Your password"
                id="https://app.argu.co/i18n/forms/session/password/label"
              />
            )}
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
        <FormattedMessage
          defaultMessage="back"
          id="https://app.argu.co/i18n/forms/session/back"
        />
      </Button>
    );
  }

  registerFields() {
    return (
      <CardRow>
        <CardContent>
          <p>{this.props.reason}</p>
          {this.emailField()}
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
        <CardRow backdrop>
          <CardContent>
            <p>
              <FormattedMessage
                defaultMessage="Please confirm your vote by clicking the link we've sent to {email}"
                id="https://app.argu.co/i18n/forms/session/emailConfirmationReminder"
                values={{
                  email: <b>{this.props.registeredEmail}</b>,
                }}
              />
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
        buttonText = (
          <FormattedMessage
            defaultMessage="Confirm"
            id="https://app.argu.co/i18n/session/confirmLabel"
          />
        );
        break;
      case STEPS.noPassword:
        formFields = (
          <CardContent endSpacing>
            <FormattedMessage
              defaultMessage="You account does not have a password yet. We've just send you a new email to set a password. Please check your inbox before continuing."
              id="https://app.argu.co/i18n/session/noPassword"
            />
          </CardContent>
        );
        buttonText = null;
        break;
      case STEPS.signIn:
        formFields = this.signInFields();
        buttonText = (
          <FormattedMessage
            defaultMessage="Continue"
            id="https://app.argu.co/i18n/session/continueLabel"
          />
        );
        break;
      case STEPS.signUp:
        formFields = this.registerFields();
        buttonText = (
          <FormattedMessage
            defaultMessage="Confirm"
            id="https://app.argu.co/i18n/session/confirmLabel"
          />
        );
        break;
      case STEPS.signUpCompleted:
        formFields = this.signUpCompleted();
        buttonText = null;
        break;
      default:
        handle(new Error(`Unexpected state '${this.props.step}' for SignIn`));
        buttonText = (
          <FormattedMessage
            defaultMessage="Unexpected state"
            id="https://app.argu.co/i18n/session/unexpectedStateLabel"
          />
        );
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
