import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { FormField } from '../../../components';
import { FormContext } from '../../../components/Form/Form';
import { tryParseInt } from '../../../helpers/numbers';
import { NS } from '../../../helpers/LinkedRenderStore';
import validators, { combineValidators } from '../../../helpers/validators';

const TEXTFIELD_MIN_ROWS = 3;
const MAX_STR_LEN = 255;

const inputsPreferringPlaceholder = [
  'text',
  'textarea',
];

class DataField extends React.Component {
  static contextType = FormContext;

  static propTypes = {
    autofocus: PropTypes.bool,
    datatype: linkType,
    defaultValue: linkType,
    description: linkType,
    fieldName: PropTypes.string,
    in: linkType,
    maxLength: linkType,
    minCount: linkType,
    minLength: linkType,
    name: linkType,
    onKeyUp: PropTypes.func,
    targetValues: PropTypes.shape({
      '@id': PropTypes.string,
    }),
    theme: PropTypes.string,
  };

  inputType() {
    if (this.props.in) {
      return 'select';
    }

    switch (this.props.datatype) {
      case NS.xsd('boolean'):
        return 'checkbox';
      case NS.xsd('dateTime'):
        return 'datetime-local';
      case NS.xsd('integer'):
      case NS.xsd('long'):
      case NS.xsd('int'):
      case NS.xsd('short'):
      case NS.xsd('byte'):
      case NS.xsd('decimal'):
        return 'number';
      case NS.ll('blob'):
        return 'file';
      case NS.fhir('markdown'):
        return 'markdown';
      case NS.ontola('datatype/password'):
        return 'password';
      default:
        if (tryParseInt(this.props.maxLength) > MAX_STR_LEN) {
          return 'textarea';
        }

        return 'text';
    }
  }

  descriptionValue() {
    if (inputsPreferringPlaceholder.includes(this.inputType())) {
      return null;
    }
    return this.props.description?.value;
  }

  placeholderValue() {
    if (!inputsPreferringPlaceholder.includes(this.inputType())) {
      return null;
    }
    return this.props.description?.value;
  }

  render() {
    const {
      fieldName,
      targetValues,
      autofocus,
      defaultValue,
      maxLength,
      minCount,
      minLength,
      name,
      theme,
      onKeyUp,
    } = this.props;

    const required = minCount && Number(minCount.value) > 0;
    const validate = [
      maxLength && validators.maxLength(maxLength),
      required && validators.required,
      minLength && validators.minLength(minLength),
    ];

    return (
      <FormField
        validateOnChange
        autofocus={autofocus}
        description={this.descriptionValue()}
        field={fieldName}
        initialValue={targetValues?.[0] || defaultValue}
        label={name && name.value}
        maxLength={tryParseInt(maxLength)}
        minLength={tryParseInt(minLength)}
        minRows={maxLength > MAX_STR_LEN ? TEXTFIELD_MIN_ROWS : undefined}
        options={this.props.in}
        placeholder={this.placeholderValue()}
        required={required}
        storeKey={this.context}
        theme={theme}
        type={this.inputType()}
        validate={combineValidators(validate)}
        onKeyUp={onKeyUp}
      />
    );
  }
}

export default DataField;
