import PropTypes from 'prop-types';
import React from 'react';
import { Field, formValueSelector, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';

import { argumentValidator } from '../../helpers/validators';
import FormField from '../FormField';

const propTypes = {
  // From redux-form
  side: PropTypes.oneOf(['pro', 'con']).isRequired,
};

const ArgumentForm = ({
  side,
}) => {
  const headingtext = () => {
    if (side === 'pro') {
      return 'Kern van voordeel...';
    }
    return 'Kern van probleem...';
  };

  const formStyle = 'preview';

  return (
    <div>
      <Field
        autoFocus
        autoComplete="Off"
        className={`Field--heading Field--${side}`}
        component={FormField}
        element="input"
        id="omniTitle"
        name="name"
        placeholder={headingtext()}
        type="text"
        validate={argumentValidator.title}
        variant={formStyle}
      />
      <Field
        rich
        component={FormField}
        id="omniBody"
        name="text"
        placeholder="Toelichting (optioneel)..."
        validate={argumentValidator.text}
        variant={formStyle}
      />
    </div>
  );
};

ArgumentForm.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => ({
  currentValue: formValueSelector(ownProps.formName)(state, 'search'),
  form: ownProps.formName,
});

const ArgumentFormContainer =
  connect(mapStateToProps)(reduxForm({
    destroyOnUnmount: false,
  })(ArgumentForm));

export default ArgumentFormContainer;
