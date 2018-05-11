import PropTypes from 'prop-types';
import React from 'react';

import {
  Button,
  CardActions,
  CardContent,
} from '../../components';

import SignInFormBase from './SignInFormBase';

const propTypes = {
  // Since this uses redux-form, you need to pass onSubmit instead of handleSubmit.
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  reason: PropTypes.string,
  step: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
};

const defaultProps = {
  hasCancel: false,
};

/**
 * Should be rendered inside a card.
 * @returns {component} Component
 */
class SignInFormCardRow extends SignInFormBase {
  render() {
    const {
      handleSubmit,
      invalid,
      submitting,
    } = this.props;
    const { buttonText, formFields } = this.currentFields();

    return (
      <CardContent>
        <form
          action="/users"
          onSubmit={handleSubmit}
        >
          {formFields}
          <CardActions noSpacing>
            {this.backButton()}
            {buttonText && (
              <Button
                disabled={invalid}
                icon="arrow-right"
                loading={submitting}
                theme="default"
                type="submit"
              >
                {buttonText}
              </Button>
            )}
          </CardActions>
        </form>
      </CardContent>
    );
  }
}

SignInFormCardRow.propTypes = propTypes;
SignInFormCardRow.defaultProps = defaultProps;

export default SignInFormCardRow;
