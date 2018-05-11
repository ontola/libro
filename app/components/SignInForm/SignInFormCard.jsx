import PropTypes from 'prop-types';
import React from 'react';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardDivider,
  CardRow,
  Heading,
} from '../../components';
import { STEPS } from '../../state/form/reducer';

import SignInFormBase from './SignInFormBase';

const propTypes = {
  // From redux-form
  fields: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ])),
  // Since this uses redux-form, you need to pass onSubmit instead of handleSubmit.
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  redirect: PropTypes.string,
  step: PropTypes.string.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const defaultProps = {
  hasCancel: false,
};

/**
 * Should be rendered inside a card.
 * @returns {component} Component
 */
class SignInFormCard extends SignInFormBase {
  contentHeader() {
    if (STEPS.signUp !== this.props.step) {
      return null;
    }

    return (
      <React.Fragment>
        <CardContent>
          <form
            action={`https://argu.co/users/auth/facebook?r=${this.props.redirect}`}
            method="GET"
            style={{ display: 'inline' }}
          >
            <Button
              margins
              small
              icon="facebook"
              type="submit"
              variant="facebook"
            >
              Facebook login
            </Button>
            <p />
          </form>
        </CardContent>
        <CardDivider text="of" />
      </React.Fragment>
    );
  }

  getFooterText() {
    if (this.props.step === STEPS.signIn) {
      return 'Something something sign up';
    } else if (this.props.step === STEPS.confirm) {
      return 'Something something sign in';
    }
    return null;
  }

  getHeaderText() {
    let login = 'inloggen';
    let register = 'registreren';
    if ([STEPS.signIn].includes(this.props.step)) {
      login = <b>{login}</b>;
    }
    if ([STEPS.confirm, STEPS.signUpCompleted].includes(this.props.step)) {
      register = <b>{register}</b>;
    }

    return (
      <React.Fragment>{login} of {register}</React.Fragment>
    );
  }

  render() {
    const {
      handleSubmit,
      invalid,
      submitting,
    } = this.props;

    const { buttonText, formFields } = this.currentFields();

    return (
      <React.Fragment>
        <Heading variant="column">
          {this.getHeaderText()}
        </Heading>
        <Card>
          <CardRow>
            {this.contentHeader()}
            <form
              action="/users"
              onSubmit={handleSubmit}
            >
              <CardContent>
                {formFields}
              </CardContent>
              <CardActions noSpacing>
                {this.backButton()}
                <Button
                  disabled={invalid}
                  icon="arrow-right"
                  loading={submitting}
                  theme="box"
                  type="submit"
                >
                  {buttonText}
                </Button>
              </CardActions>
            </form>
          </CardRow>
        </Card>
        <ul>
          <li>{this.getFooterText()}</li>
          <li>Forgot password?</li>
          <li>Confirmation instructions?</li>
        </ul>
      </React.Fragment>
    );
  }
}

SignInFormCard.propTypes = propTypes;
SignInFormCard.defaultProps = defaultProps;

export default SignInFormCard;
