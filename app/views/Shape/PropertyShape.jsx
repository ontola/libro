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
import { allTopologies, NS } from '../../helpers/LinkedRenderStore';
import validators, { combineValidators } from '../../helpers/validators';

const MAX_STR_LEN = 255;
const TEXTFIELD_ROWS = 3;

const propTypes = {
  autofocus: PropTypes.bool,
  class: linkType,
  datatype: linkType,
  description: linkType,
  in: linkType,
  maxLength: linkType,
  name: linkType,
  onKeyUp: PropTypes.func,
  path: linkType,
  targetNode: subjectType,
  theme: PropTypes.string,
};

function listToArr(lrs, acc, rest) {
  if (Array.isArray(rest)) {
    return rest;
  }
  if (!rest || rest === NS.rdf('nil')) {
    return acc;
  }

  const first = lrs.store.anyStatementMatching(rest, NS.rdf('first'));
  acc.push(first.object);
  listToArr(lrs, acc, lrs.store.anyStatementMatching(rest, NS.rdf('rest')).object);

  return acc;
}

class PropertyShape extends PropertyBase {
  shouldComponentUpdate() {
    return true;
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
      description,
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
        <FormSection name={fieldName}>
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
          field={fieldName}
          initialValue={t && t.value}
          label={name && name.value}
          maxLength={maxLength}
          minLength={minLength}
          options={this.props.in && listToArr(this.props.lrs, [], this.props.in)}
          placeholder={description && description.value}
          required={required}
          rows={this.props.maxLength > MAX_STR_LEN ? TEXTFIELD_ROWS : undefined}
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
