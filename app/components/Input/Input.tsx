import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import './Input.scss';

const propTypes = {
  autoComplete: PropTypes.oneOf([
    'off',
    'on',
    'name',
    'honorific-prefix',
    'given-name',
    'additional-name',
    'family-name',
    'honorific-suffix',
    'nickname',
    'email',
    'username',
    'new-password',
    'current-password',
    'organization-title',
    'organization',
    'address-line1',
    'address-line2',
    'address-line3',
    'address-level1',
    'address-level2',
    'address-level3',
    'address-level4',
    'country',
    'country-name',
    'postal-code',
    'cc-name',
    'cc-given-name',
    'cc-additional-name',
    'cc-family-name',
    'cc-number',
    'cc-exp',
    'cc-exp-month',
    'cc-exp-year',
    'cc-exp-csc',
    'cc-exp-type',
    'transaction-currency',
    'transaction-amount',
    'language',
    'bday',
    'bday-day',
    'bday-month',
    'bday-year',
    'sex',
    'tel',
    'tel-country-code',
    'tel-national',
    'tel-area-code',
    'tel-local',
    'tel-local-prefix',
    'tel-local-suffix',
    'tel-extension',
    'url',
    'photo',
  ]),
  autoFocus: PropTypes.bool,
  capture: PropTypes.bool,
  className: PropTypes.string,
  element: PropTypes.elementType,
  /**
   * @API custom
   * Set the fields' value to this if the type is hidden.
   */
  hiddenValue: PropTypes.string,
  inputMode: PropTypes.oneOf([
    'decimal',
    'email',
    'none',
    'number',
    'numeric',
    'search',
    'text',
    'url',
  ]),
  onChange: PropTypes.func,
  spellCheck: PropTypes.bool,
  type: PropTypes.oneOf([
    'button',
    'checkbox',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'markdown',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'textarea',
    'time',
    'url',
    'week',
  ]),
  value: PropTypes.oneOfType([
    linkType,
    PropTypes.bool,
    PropTypes.string,
  ]),
};

const defaultProps = {
  element: 'input',
};

const Input = ({
  element,
  className,
  value,
  ...props
}: {
  element: any,
  className?: string,
  minLength?: number,
  name?: string,
  placeholder?: string,
  required?: boolean,
  type: string,
  value?: string,
  onKeyUp?: (e: any) => any,
}) => {
  const Element = element;

  return (
    <Element
      className={`Input ${className ?? ''}`}
      value={value ?? ''}
      {...props}
    />
  );
};

Input.defaultProps = defaultProps;
Input.propTypes = propTypes;

export default Input;
