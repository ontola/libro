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
import { collectionMembers } from '../../helpers/diggers';
import {
  calculateFormFieldName,
  markForRemove,
  retrieveIdFromValue,
} from '../../helpers/forms';
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

  oneToManyRenderer() {
    const {
      maxCount,
      minCount,
      theme,
    } = this.props;

    return ({ input: { onChange, value } }) => {
      const showAddButton = maxCount
        ? value.length < tryParseInt(maxCount)
        : true;

      const addItem = () => {
        const next = value ? [...value] : [];
        next.push({
          '@id': new BlankNode(),
        });
        onChange(next);
      };

      const showRemoveItem = minCount
        ? tryParseInt(minCount) > value.length
        : true;

      const removeItem = index => (e) => {
        if (e && typeof e.preventDefault === 'function') {
          e.preventDefault();
        }
        const next = value.map((v, i) => {
          if (i !== index) {
            return v;
          }
          return markForRemove(v);
        });

        if (next.filter(Boolean).length === 0) {
          onChange([]);
        } else {
          onChange(next);
        }
      };

      const children = value
        .map((v, index) => this.nestedResourceView({
          key: v?.['@id'] || index,
          propertyIndex: index,
          removeItem: showRemoveItem && removeItem(index),
          targetValue: v,
        }));

      return (
        <React.Fragment>
          {this.labelComponent(theme !== 'omniform' || value.length > 0)}
          {children}
          {showAddButton && this.addButton(addItem)}
        </React.Fragment>
      );
    };
  }

  oneToOneRenderer() {
    const { minCount, theme } = this.props;

    return ({ input }) => {
      const inputAlwaysVisible = theme !== 'omniform';

      const showAddButton = !inputAlwaysVisible && !input.value;
      const addItem = () => {
        input.onChange({
          '@id': new BlankNode(),
        });
      };

      const present = input.value?.termType || Object.values(input.value || {}).find(Boolean);
      const showRemoveItem = (present || !inputAlwaysVisible)
        && (minCount ? tryParseInt(minCount) === 0 : true);
      const removeItem = (e) => {
        if (e && typeof e.preventDefault === 'function') {
          e.preventDefault();
        }
        input.onChange(markForRemove(input.value));
      };

      return (
        <React.Fragment>
          {this.labelComponent(theme !== 'omniform' || !!input.value)}
          {(input.value || inputAlwaysVisible) && this.nestedResourceView({
            removeItem: showRemoveItem && removeItem,
            targetValue: input.value ?? { '@id': input.value },
          })}
          {showAddButton && this.addButton(addItem)}
        </React.Fragment>
      );
    };
  }

  addButton(addItem) {
    return (
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
    );
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
        if (tryParseInt(this.props.maxLength) > MAX_STR_LEN) {
          return 'textarea';
        }

        return 'text';
    }
  }

  labelComponent(showLabel) {
    const { name } = this.props;

    if (name) {
      return (
        <label style={{ display: showLabel ? '' : 'none' }}>
          {name.value}
        </label>
      );
    }

    return null;
  }

  nestedResourceView(props) {
    const {
      lrs,
      targetNode,
      theme,
      onKeyUp,
    } = this.props;

    const targetShape = lrs.store.anyStatementMatching(
      null,
      NS.sh('targetClass'),
      this.props.class
    );

    const children = !targetShape
      ? (
        <Property
          label={NS.sh('class')}
          targetNode={targetNode}
          theme={theme}
          onKeyUp={onKeyUp}
          {...props}
        />
      )
      : (
        <LinkedResourceContainer
          subject={targetShape.subject}
          theme={theme}
          onKeyUp={onKeyUp}
          {...props}
        />
      );

    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
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
        initialValue={targetValues?.[0] || defaultValue}
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
      path,
      maxCount,
      minCount,
    } = this.props;

    const isOneToMany = !maxCount || tryParseInt(maxCount) > 1 || tryParseInt(minCount) > 1;

    const fieldView = isOneToMany
      ? this.oneToManyRenderer()
      : this.oneToOneRenderer();
    const dataObjects = targetValues.map(iri => ({ '@id': iri }));
    const initialValue = isOneToMany
      ? dataObjects
      : dataObjects?.[0];

    return (
      <FormSection name={fieldName} path={path}>
        <Field
          allowNull
          format={null}
          initialValue={initialValue}
          name={fieldName}
          render={fieldView}
        />
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

    const fieldName = calculateFormFieldName(propertyIndex, path);
    const targetObject = targetNode || retrieveIdFromValue(this.props.targetValue);
    const targetIRI = targetObject && targetObject instanceof Term && targetObject;
    let targetValues = targetIRI && lrs.getResourceProperties(targetIRI, path) ?? [];
    const isCollection = targetValues?.length === 1
      && lrs.findSubject(targetValues[0], [NS.rdf('type')], NS.as('Collection')).length > 0;

    if (isCollection) {
      targetValues = lrs.dig(targetValues[0], collectionMembers);
    }

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
