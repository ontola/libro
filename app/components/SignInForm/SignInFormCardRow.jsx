import { Form } from 'informed';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';
import { CardActions } from '../../topologies/Card';

import SignInFormBase from './SignInFormBase';

const propTypes = {
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
      invalid,
      onSubmit,
    } = this.props;
    const { buttonText, formFields } = this.currentFields();

    return (
      <Form validateOnBlur onSubmit={onSubmit}>
        {({ submitting }) => (
          <React.Fragment>
            {formFields}
            {(this.backButton() || buttonText) && (
              <CardActions alignRight noSpacing>
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
            )}
          </React.Fragment>
        )}
      </Form>
    );
  }
}

SignInFormCardRow.propTypes = propTypes;
SignInFormCardRow.defaultProps = defaultProps;

export default SignInFormCardRow;
