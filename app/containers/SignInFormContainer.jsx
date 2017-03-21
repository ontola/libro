import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import {
  Button,
  CardActions,
  CardContent,
  CardDivider,
  CardRow,
  FormField,
  HiddenFormField,
} from 'components';
import {
  safeCredentials,
} from 'helpers/arguHelpers';
import { fetchActor } from 'state/currentActors/actions';
import { emailTaken } from 'state/form/actions';

const PATH_MATCH = 2;

const propTypes = {
  // From redux-form
  fields: PropTypes.arrayOf(PropTypes.string),
  invalid: PropTypes.bool,
  // Since this uses redux-form, you need to pass onSubmit instead of handleSubmit.
  handleSubmit: PropTypes.func.isRequired,
  hasCancel: PropTypes.bool,
  redirect: PropTypes.string,
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
  fields,
  invalid,
  redirect,
  submitting,
}) => {
  let loginField;
  if (fields.includes('password')) {
    loginField = (
      <Field
        autoComplete="Off"
        component={FormField}
        element="input"
        id="SignInPassword"
        label="Jouw wachtwoord"
        name="password"
        type="password"
        variant="material"
      />
    );
  }
  return (
    <CardRow>
      <CardContent>
        <span>Log in met </span>
        <form action={`https://argu.co/users/auth/facebook?r=${redirect}`} method="GET" style={{ display: 'inline' }}>
          <Button small margins icon="facebook" type="submit" variant="facebook">
            Facebook
          </Button>
        </form>
      </CardContent>
      <CardDivider text="of" />
      <form
        action="/users"
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
        {loginField}
        <Field
          component={HiddenFormField}
          id="r"
          name="r"
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
    </CardRow>
  );
};

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

const mapStateToProps = (state, props) => {
  const password = state.getIn(['form', 'signIn', 'fields', 'password']) !== undefined;
  return ({
    fields: ['email', 'r', password && 'password'],
    form: 'signIn',
    initialValues: {
      r: props.redirect,
    },
    validate,
  });
};

const mapDispatchToProps = (dispatch, props) => ({
  onSubmit: values => fetch('/login', safeCredentials({
    body: JSON.stringify(values.toJS()),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    redirect: 'manual',
  }))
  .then(res => res.json())
  .then((json) => {
    let match, r, redirect;
    switch (json.status) {
      case 'EMAIL_TAKEN':
        dispatch(emailTaken());
        break;
      case 'LOGGED_IN':
        dispatch(fetchActor());
        r = values.get('r');
        if (r) {
          match = r.match(/^https:\/\/[\w*.]*argu\.(local|co)([\w\W]*$)/);
        }
        redirect = (match && match[PATH_MATCH]) || '/';
        props.router.push(redirect);
        break;
      default:
        throw new Error('Unknown user error occurred');
    }
  })
});

const SignInFormContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  validate,
}
)(SignInForm)));

export default SignInFormContainer;
