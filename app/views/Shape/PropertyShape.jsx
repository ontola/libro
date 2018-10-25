import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  LinkedResourceContainer,
  linkType,
  Property,
  PropertyBase,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  FormField,
  FormSection,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { tryParseInt } from '../../helpers/numbers';
import validators, { combineValidators } from '../../helpers/validators';
import { allTopologies } from '../../topologies';

const MAX_STR_LEN = 255;
const TEXTFIELD_MIN_ROWS = 3;

const propTypes = {
  autofocus: PropTypes.bool,
  class: linkType,
  datatype: linkType,
  defaultValue: linkType,
  description: linkType,
  in: linkType,
  maxLength: linkType,
  name: linkType,
  onKeyUp: PropTypes.func,
  path: linkType,
  targetNode: subjectType,
  theme: PropTypes.string,
};

const inputsPreferringPlaceholder = [
  'text',
  'textarea',
];

class PropertyShape extends PropertyBase {
  descriptionValue() {
    if (inputsPreferringPlaceholder.includes(this.inputType())) {
      return null;
    }
    return this.props.description && this.props.description.value;
  }

  shouldComponentUpdate() {
    return true;
  }

  placeholderValue() {
    if (!inputsPreferringPlaceholder.includes(this.inputType())) {
      return null;
    }
    return this.props.description && this.props.description.value;
  }

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
      default:
        if (this.maxLength() > MAX_STR_LEN) {
          return 'textarea';
        }

        return 'text';
    }
  }

  maxLength() {
    return this.props.maxLength && Number.parseInt(this.props.maxLength.value, 10);
  }

  render() {
    const {
      autofocus,
      datatype,
      defaultValue,
      maxLength,
      minCount,
      minLength,
      name,
      onKeyUp,
      path,
      targetNode,
      theme,
    } = this.props;
    const fieldName = btoa(this.props.path.value);

    if (this.props.class) {
      const targetShape = this.props.lrs.store.anyStatementMatching(null, NS.sh('targetClass'), this.props.class);

      const child = !targetShape
        ? <Property label={NS.sh('class')} targetNode={targetNode} theme={theme} onKeyUp={onKeyUp} />
        : (
          <LinkedResourceContainer
            subject={targetShape.subject}
            theme={theme}
            onKeyUp={onKeyUp}
          />
        );

      return (
        <FormSection name={fieldName} path={path}>
          <label>{name && theme !== 'omniform' && name.value}</label>
          {child}
        </FormSection>
      );
    } else if (datatype) {
      const t = targetNode && this.props.lrs.getResourceProperty(targetNode, path);
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
          initialValue={t || defaultValue}
          label={name && name.value}
          maxLength={tryParseInt(maxLength)}
          minLength={tryParseInt(minLength)}
          minRows={this.props.maxLength > MAX_STR_LEN ? TEXTFIELD_MIN_ROWS : undefined}
          options={this.props.in}
          placeholder={this.placeholderValue()}
          required={required}
          theme={theme}
          type={this.inputType()}
          validate={combineValidators(validate)}
          onKeyUp={onKeyUp}
        />
      );
    }

    return null;
  }
}

PropertyShape.propTypes = propTypes;

export default [
  LinkedRenderStore.registerRenderer(
    link([
      NS.sh('class'),
      NS.sh('datatype'),
      NS.sh('description'),
      NS.sh('defaultValue'),
      NS.sh('in'),
      NS.sh('maxLength'),
      NS.sh('minCount'),
      NS.sh('minLength'),
      NS.sh('name'),
      NS.sh('path'),
    ])(PropertyShape),
    NS.sh('PropertyShape'),
    RENDER_CLASS_NAME,
    allTopologies
  ),
];
