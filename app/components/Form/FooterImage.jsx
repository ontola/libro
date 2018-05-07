import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  ariaLabel: PropTypes.string,
  linkedProp: linkedPropType,
};

const FormFooterImage = ({ ariaLabel, linkedProp }) => (
  <div
    className="Form__footer-image"
    style={{ backgroundImage: `url(${linkedProp.value})` }}
    title={ariaLabel}
  />
);

FormFooterImage.propTypes = propTypes;

export default FormFooterImage;
