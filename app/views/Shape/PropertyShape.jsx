import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  LinkedResourceContainer,
  linkType,
  lrsType,
  Property,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  FormField,
  FormSection,
} from '../../components';
import { FormContext } from '../../components/Form/Form';
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
  lrs: lrsType,
  maxLength: linkType,
  minCount: linkType,
  minLength: linkType,
  name: linkType,
  onKeyUp: PropTypes.func,
  path: linkType,
  targetNode: subjectType,
  targetValue: linkType,
  theme: PropTypes.string,
};

const inputsPreferringPlaceholder = [
  'text',
  'textarea',
];

class PropertyShape extends React.Component {
  static contextType = FormContext;

  shouldComponentUpdate() {
    return true;
  }

  descriptionValue() {
    if (inputsPreferringPlaceholder.includes(this.inputType())) {
      return null;
    }
    return this.props.description && this.props.description.value;
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
      case NS.ontola('datatype/password'):
        return 'password';
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

  renderDataField(fieldName, targetValue) {
    const {
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
        initialValue={targetValue || defaultValue}
        label={name && name.value}
        maxLength={tryParseInt(maxLength)}
        minLength={tryParseInt(minLength)}
        minRows={this.props.maxLength > MAX_STR_LEN ? TEXTFIELD_MIN_ROWS : undefined}
        options={this.props.in}
        placeholder={this.placeholderValue()}
        required={required}
        storeKey={`${this.context}.${fieldName}`}
        theme={theme}
        type={this.inputType()}
        validate={combineValidators(validate)}
        onKeyUp={onKeyUp}
      />
    );
  }

  renderNestedResource(fieldName, targetValue) {
    const {
      name,
      onKeyUp,
      path,
      targetNode,
      theme,
    } = this.props;
    const targetShape = this.props.lrs.store.anyStatementMatching(null, NS.sh('targetClass'), this.props.class);

    const child = !targetShape
      ? (
        <Property
          label={NS.sh('class')}
          targetNode={targetNode}
          targetValue={targetValue}
          theme={theme}
          onKeyUp={onKeyUp}
        />
      )
      : (
        <LinkedResourceContainer
          subject={targetShape.subject}
          targetValue={targetValue}
          theme={theme}
          onKeyUp={onKeyUp}
        />
      );

    return (
      <FormSection name={fieldName} path={path}>
        {name && <label style={{ display: theme === 'omniform' ? 'none' : '' }}>{name.value}</label>}
        {child}
      </FormSection>
    );
  }

  render() {
    const {
      lrs,
      path,
      targetNode,
    } = this.props;

    const fieldName = btoa(path.value);
    const currentTarget = targetNode || this.props.targetValue;
    const targetValue = currentTarget && lrs.getResourceProperty(currentTarget, path);

    if (this.props.class) {
      return this.renderNestedResource(fieldName, targetValue);
    } else if (this.props.datatype) {
      return this.renderDataField(fieldName, targetValue);
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
