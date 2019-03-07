import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'react-final-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { STEPS } from '../../state/form/reducer';
import Button from '../Button';
import Card, {
  CardActions,
  CardContent,
  CardDivider,
  CardRow,
} from '../../topologies/Card';
import Heading from '../Heading';
import path from '../../helpers/paths';
import { expandPath } from '../../helpers/iris';
import messages from '../../state/form/messages';

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
  constructor(props) {
    super(props);

    this.fieldSettings[STEPS.signUp].emailField.autofocus = true;
  }

  contentHeader() {
    if (STEPS.signUp !== this.props.step) {
      return null;
    }

    return (
      <React.Fragment>
        <CardContent>
          <form
            validateOnBlur
            action={expandPath('/users/auth/facebook')}
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
          </form>
        </CardContent>
        <CardDivider text={this.props.intl.formatMessage(messages.or)} />
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
    let login = this.props.intl.formatMessage(messages.login);
    let register = this.props.intl.formatMessage(messages.register);
    if ([STEPS.signIn].includes(this.props.step)) {
      login = <b>{login}</b>;
    }
    if ([STEPS.confirm, STEPS.signUpCompleted].includes(this.props.step)) {
      register = <b>{register}</b>;
    }

    return (
      <React.Fragment>
        {login}
        {' '}
        <FormattedMessage {...messages.or} />
        {' '}
        {register}
      </React.Fragment>
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
            onSubmit={onSubmit}
          >
            {({ handleSubmit, pristine, submitting }) => (
              <form action="/users" onSubmit={handleSubmit}>
                {formFields}
                <CardRow>
                  <CardActions noSpacing>
                    {this.backButton()}
                    <Button
                      disabled={invalid || pristine}
                      icon="arrow-right"
                      loading={submitting}
                      theme="box"
                      type="submit"
                    >
                      {buttonText}
                    </Button>
                  </CardActions>
                </CardRow>
              </form>
            )}
          </Form>
        </Card>
        <ul>
          <li>{this.getFooterText()}</li>
          <li>
            <Link to={path.newPassword()}>
              <FormattedMessage
                defaultMessage="Forgot password?"
                id="https://app.argu.co/i18n/forms/session/forgotLink/label"
              />
            </Link>
          </li>
          <li>
            <Link to={path.confirmation()}>
              <FormattedMessage
                defaultMessage="Resend confirmation link?"
                id="https://app.argu.co/i18n/forms/session/confirmationLink/label"
              />
            </Link>
          </li>
          <li>
            <Link to={path.newUnlock()}>
              <FormattedMessage
                defaultMessage="Account locked?"
                id="https://app.argu.co/i18n/forms/session/accountLocked/label"
              />
            </Link>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

SignInFormCard.propTypes = propTypes;
SignInFormCard.defaultProps = defaultProps;

export default injectIntl(SignInFormCard);
