import equal from 'fast-deep-equal';
import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'react-final-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Redirect } from 'react-router';

import { STEPS } from '../../state/form/reducer';
import Button from '../Button';
import Card, {
  CardActions,
  CardContent,
  CardDivider,
  CardRow,
} from '../../topologies/Card';
import Heading from '../Heading';
import { getAuthenticityToken } from '../../helpers/arguHelpers';
import { expandPath, retrievePath } from '../../helpers/iris';
import messages from '../../state/form/messages';

import SignInFormBase from './SignInFormBase';
import { AccountHelpersCardAppendix } from './SignInFormHelpers';

const propTypes = {
  // From redux-form
  fields: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ])),
  fullPage: PropTypes.bool,
  invalid: PropTypes.bool,
  onSubmit: PropTypes.func,
  r: PropTypes.string,
  step: PropTypes.string.isRequired,
  userType: PropTypes.oneOf(['GuestUser', 'ConfirmedUser', 'UnconfirmedUser']),
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
            action={expandPath(`/users/auth/facebook?_csrf=${getAuthenticityToken()}`)}
            method="POST"
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
      fullPage,
      invalid,
      onSubmit,
      r,
      userType,
    } = this.props;

    const { buttonText, formFields } = this.currentFields();

    if (fullPage && ['ConfirmedUser', 'UnconfirmedUser'].includes(userType)) {
      return <Redirect to={retrievePath(r)} />;
    }

    return (
      <React.Fragment>
        <Card>
          <CardContent>
            <Heading size="1">
              {this.getHeaderText()}
            </Heading>
          </CardContent>
          {this.contentHeader()}
          <Form
            initialValuesEqual={equal}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, submitting }) => (
              <form
                action="/users"
                data-testid="sign-in-form"
                onSubmit={handleSubmit}
              >
                {formFields}
                <CardRow>
                  <CardActions noSpacing>
                    {this.backButton()}
                    {buttonText && (
                      <Button
                        disabled={invalid}
                        icon="arrow-right"
                        loading={submitting}
                        theme="box"
                        type="submit"
                      >
                        {buttonText}
                      </Button>
                    )}
                  </CardActions>
                </CardRow>
              </form>
            )}
          </Form>
          <AccountHelpersCardAppendix />
        </Card>
      </React.Fragment>
    );
  }
}

SignInFormCard.propTypes = propTypes;
SignInFormCard.defaultProps = defaultProps;

export default injectIntl(SignInFormCard);
