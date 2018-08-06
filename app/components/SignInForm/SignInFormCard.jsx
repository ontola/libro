import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'informed';

import { STEPS } from '../../state/form/reducer';
import Button from '../Button';
import Card, {
  CardActions,
  CardContent,
  CardDivider,
  CardRow,
} from '../Card';
import Heading from '../Heading';

import SignInFormBase from './SignInFormBase';

const propTypes = {
  // From redux-form
  fields: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ])),
  invalid: PropTypes.bool,
  onSubmit: PropTypes.func,
  r: PropTypes.string,
  step: PropTypes.string.isRequired,
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
          <Form
            validateOnBlur
            action={`https://argu.co/users/auth/facebook?r=${this.props.redirect}`}
            method="GET"
            style={{ display: 'inline' }}
          >
            <Button
              small
              icon="facebook"
              type="submit"
              variant="facebook"
            >
              Facebook login
            </Button>
            <p />
          </Form>
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
      invalid,
      onSubmit,
    } = this.props;

    const { buttonText, formFields } = this.currentFields();

    return (
      <React.Fragment>
        <Heading variant="column">
          {this.getHeaderText()}
        </Heading>
        <Card>
          {this.contentHeader()}
          <Form
            validateOnBlur
            action="/users"
            onSubmit={onSubmit}
          >
            {() => (
              <React.Fragment>
                {formFields}
                <CardRow>
                  <CardActions noSpacing>
                    {this.backButton()}
                    <Button
                      disabled={invalid}
                      icon="arrow-right"
                      loading={false}
                      theme="box"
                      type="submit"
                    >
                      {buttonText}
                    </Button>
                  </CardActions>
                </CardRow>
              </React.Fragment>
            )}
          </Form>
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
