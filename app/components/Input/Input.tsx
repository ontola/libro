import React, { ChangeEvent, EventHandler } from 'react';

import { isString } from '../../helpers/types';

import './Input.scss';

export enum InputAutocomplete {
  Off = 'off',
  On = 'on',
  Name = 'name',
  HonorificPrefix = 'honorific-prefix',
  GivenName = 'given-name',
  AdditionalName = 'additional-name',
  FamilyName = 'family-name',
  HonorificSuffix = 'honorific-suffix',
  Nickname = 'nickname',
  Email = 'email',
  Username = 'username',
  NewPassword = 'new-password',
  CurrentPassword = 'current-password',
  OrganizationTitle = 'organization-title',
  Organization = 'organization',
  AddressLine1 = 'address-line1',
  AddressLine2 = 'address-line2',
  AddressLine3 = 'address-line3',
  AddressLevel1 = 'address-level1',
  AddressLevel2 = 'address-level2',
  AddressLevel3 = 'address-level3',
  AddressLevel4 = 'address-level4',
  Country = 'country',
  CountryName = 'country-name',
  PostalCode = 'postal-code',
  CcName = 'cc-name',
  CcGivenName = 'cc-given-name',
  CcAdditionalName = 'cc-additional-name',
  CcFamilyName = 'cc-family-name',
  CcNumber = 'cc-number',
  CcExp = 'cc-exp',
  CcExpMonth = 'cc-exp-month',
  CcExpYear = 'cc-exp-year',
  CcExpCsc = 'cc-exp-csc',
  CcExpType = 'cc-exp-type',
  TransactionCurrency = 'transaction-currency',
  TransactionAmount = 'transaction-amount',
  Language = 'language',
  Bday = 'bday',
  BdayDay = 'bday-day',
  BdayMonth = 'bday-month',
  BdayYear = 'bday-year',
  Sex = 'sex',
  Tel = 'tel',
  TelCountryCode = 'tel-country-code',
  TelNational = 'tel-national',
  TelAreaCode = 'tel-area-code',
  TelLocal = 'tel-local',
  TelLocalPrefix = 'tel-local-prefix',
  TelLocalSuffix = 'tel-local-suffix',
  TelExtension = 'tel-extension',
  Url = 'url',
  Photo = 'photo',
}
export enum InputMode {
  Decimal = 'decimal',
  Email = 'email',
  None = 'none',
  Number = 'number',
  Numeric = 'numeric',
  Search = 'search',
  Tel = 'tel',
  Url = 'url',
}

export enum InputType {
  Button = 'button',
  Checkbox = 'checkbox',
  Color = 'color',
  Date = 'date',
  Datetime = 'datetime-local',
  Email = 'email',
  File = 'file',
  Hidden = 'hidden',
  Image = 'image',
  Markdown = 'markdown',
  Month = 'month',
  Number = 'number',
  Password = 'password',
  Radio = 'radio',
  Range = 'range',
  Reset = 'reset',
  Search = 'search',
  Submit = 'submit',
  Tel = 'tel',
  Text = 'text',
  Textarea = 'textarea',
  Time = 'time',
  Url = 'url',
  Week = 'week',
}

export interface InputProps {
  autoComplete?: InputAutocomplete;
  autoFocus?: boolean;
  capture?: string | boolean;
  checked?: boolean;
  className?: string;
  'data-testid'?: string;
  element?: any;
  hiddenValue?: string;
  id?: string;
  inputMode?: InputMode;
  minLength?: number;
  name: string;
  onChange?: EventHandler<ChangeEvent<HTMLInputElement>>;
  onKeyUp?: EventHandler<any>;
  placeholder?: string;
  required?: boolean;
  spellCheck?: boolean | 'true' | 'false';
  type?: InputType;
  value?: boolean | string | number;
}

const defaultProps = {
  element: 'input',
};

const Input: React.FC<InputProps> = ({
  element,
  className,
  value,
  ...props
}) => {
  const Element = element;

  const inputRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (props.autoFocus && inputRef.current && isString(element)) {
      inputRef.current.focus();
    }
  }, [props.autoFocus, inputRef.current]);

  return (
    <Element
      className={`Input ${className ?? ''}`}
      ref={inputRef}
      value={value ?? ''}
      {...props}
    />
  );
};

Input.defaultProps = defaultProps;

export default Input;
