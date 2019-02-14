import {
  LinkedResourceContainer,
  linkType,
  lrsType,
  Property,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import { BlankNode, Term } from 'rdflib';
import React from 'react';
import { Field, withReactFinalForm } from 'react-final-form';

import {
  FormField,
  FormSection,
} from '../../components';
import Button from '../../components/Button';
import { FormContext } from '../../components/Form/Form';
import { NS } from '../../helpers/LinkedRenderStore';
import { tryParseInt } from '../../helpers/numbers';
import validators, { combineValidators } from '../../helpers/validators';
import { allTopologies } from '../../topologies';
import { omniformSupplementBarTopology } from '../../topologies/OmniformSupplementBar/OmniformSupplementBar';

const MAX_STR_LEN = 255;
const TEXTFIELD_MIN_ROWS = 3;

const inputsPreferringPlaceholder = [
  'text',
  'textarea',
];

class PropertyShape extends React.Component {
  static contextType = FormContext;

  static type = NS.sh('PropertyShape');

  static topology = allTopologies;

  static mapDataToProps = [
    NS.sh('class'),
    NS.sh('datatype'),
    NS.sh('description'),
    NS.sh('defaultValue'),
    NS.sh('in'),
    NS.sh('maxCount'),
    NS.sh('maxLength'),
    NS.sh('minCount'),
    NS.sh('minLength'),
    NS.sh('name'),
    NS.sh('path'),
  ];

  static hocs = [withReactFinalForm];

  static propTypes = {
    autofocus: PropTypes.bool,
    class: linkType,
    datatype: linkType,
    defaultValue: linkType,
    description: linkType,
    in: linkType,
    lrs: lrsType,
    maxCount: linkType,
    maxLength: linkType,
    minCount: linkType,
    minLength: linkType,
    name: linkType,
    onKeyUp: PropTypes.func,
    path: linkType,
    propertyIndex: PropTypes.number,
    targetNode: subjectType,
    targetValue: linkType,
    theme: PropTypes.string,
  };

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

  renderDataField(fieldName, targetValues) {
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
        initialValue={(targetValues && targetValues[0]) || defaultValue}
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

  renderNestedResource(fieldName, targetValues) {
    const {
      name,
      onKeyUp,
      path,
      targetNode,
      maxCount,
      theme,
    } = this.props;
    const targetShape = this.props.lrs.store.anyStatementMatching(
      null,
      NS.sh('targetClass'),
      this.props.class
    );

    return (
      <FormSection name={fieldName} path={path}>
        <Field name={fieldName}>
          {({ input }) => {
            const allValues = [];

            if (targetValues) {
              allValues.push(...targetValues);
            }

            if (input.value) {
              allValues.push(...input.value);
            }

            const showAddButton = maxCount
              ? allValues.length < Number.parseInt(maxCount.value, 10)
              : true;

            const showLabel = theme !== 'omniform' || allValues.length > 0;

            const addItem = () => {
              const next = input.value ? [...input.value] : [];
              next.push({
                list_id: new BlankNode().id,
              });
              input.onChange(next);
            };

            const removeItem = index => (e) => {
              if (e && typeof e.preventDefault === 'function') {
                e.preventDefault();
              }
              const next = input.value.filter((_, i) => i !== index);
              input.onChange(next);
            };

            const children = allValues.map((v, index) => (
              !targetShape
                ? (
                  <Property
                    key={v.list_id || index}
                    label={NS.sh('class')}
                    propertyIndex={index}
                    removeItem={removeItem(index)}
                    targetNode={targetNode}
                    targetValue={v}
                    theme={theme}
                    onKeyUp={onKeyUp}
                  />
                )
                : (
                  <LinkedResourceContainer
                    key={v.list_id || index}
                    propertyIndex={index}
                    removeItem={removeItem(index)}
                    subject={targetShape.subject}
                    targetValue={v}
                    theme={theme}
                    onKeyUp={onKeyUp}
                  />
                )
            ));

            return (
              <React.Fragment>
                {name && <label style={{ display: showLabel ? '' : 'none' }}>{name.value}</label>}
                {children}
                {showAddButton && (
                  <Button
                    small
                    theme="transparant"
                    onClick={addItem}
                  >
                    <LinkedResourceContainer
                      subject={this.props.path}
                      topology={omniformSupplementBarTopology}
                    />
                  </Button>
                )}
              </React.Fragment>
            );
          }}
        </Field>
      </FormSection>
    );
  }

  render() {
    const {
      lrs,
      path,
      propertyIndex,
      targetNode,
    } = this.props;

    const fieldName = `${propertyIndex !== undefined ? `${propertyIndex}.` : ''}${btoa(path.value)}`;
    const targetObject = targetNode || this.props.targetValue;
    const targetIRI = targetObject && targetObject instanceof Term && targetObject;
    const targetValues = targetIRI && lrs.getResourceProperties(targetIRI, path);

    if (this.props.class) {
      return this.renderNestedResource(fieldName, targetValues);
    } else if (this.props.datatype) {
      return this.renderDataField(fieldName, targetValues);
    }

    return null;
  }
}

export default [
  register(PropertyShape),
];
