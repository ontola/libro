import {
  LinkedResourceContainer,
  Property,
  linkType,
  lrsType,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'react-final-form';

import Button from '../../../components/Button';
import FieldLabel from '../../../components/FieldLabel';
import { FormContext } from '../../../components/Form/Form';
import FormSection from '../../../components/Form/FormSection';
import { NS } from '../../../helpers/LinkedRenderStore';
import { tryParseInt } from '../../../helpers/numbers';
import { omniformSupplementBarTopology } from '../../../topologies/OmniformSupplementBar/OmniformSupplementBar';

import OneToOneRenderer from './OneToOne';
import OneToManyRenderer from './OneToMany';

class NestedResource extends React.Component {
  static contextType = FormContext;

  static propTypes = {
    class: linkType,
    description: linkType,
    fieldName: PropTypes.string,
    lrs: lrsType,
    maxCount: linkType,
    minCount: linkType,
    name: linkType,
    onKeyUp: PropTypes.func,
    path: linkType,
    targetNode: subjectType,
    targetValues: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': linkType,
      })
    ),
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.addButton = this.addButton.bind(this);
    this.descriptionComponent = this.descriptionComponent.bind(this);
    this.labelComponent = this.labelComponent.bind(this);
    this.nestedResourceView = this.nestedResourceView.bind(this);
  }

  nestedResourceView(props) {
    const {
      lrs,
      targetNode,
      theme,
      onKeyUp,
    } = this.props;

    if (typeof props.targetValue === 'undefined') {
      return null;
    }

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

  descriptionComponent() {
    const { description } = this.props;

    if (description) {
      return <div>{description.value}</div>;
    }

    return null;
  }

  labelComponent(showLabel) {
    const { name } = this.props;

    if (name) {
      return (
        <FieldLabel
          hidden={!showLabel}
          label={name.value}
        />
      );
    }

    return null;
  }

  render() {
    const {
      path,
      fieldName,
      targetValues,
      maxCount,
      minCount,
      theme,
    } = this.props;

    if (theme === 'omniform') {
      return null;
    }

    const isOneToMany = !maxCount || tryParseInt(maxCount) > 1 || tryParseInt(minCount) > 1;

    const FieldView = isOneToMany
      ? OneToManyRenderer
      : OneToOneRenderer;
    const dataObjects = targetValues.map(iri => ({ '@id': iri }));
    const initialValue = isOneToMany
      ? dataObjects
      : dataObjects?.[0];

    return (
      <FormSection name={fieldName} path={path}>
        <Field
          allowNull
          format={i => i}
          initialValue={initialValue}
          name={fieldName}
          render={({ input }) => (
            <FieldView
              addButton={this.addButton}
              context={this.context}
              descriptionComponent={this.descriptionComponent}
              input={input}
              labelComponent={this.labelComponent}
              maxCount={maxCount}
              minCount={minCount}
              nestedResourceView={this.nestedResourceView}
              theme={theme}
            />
          )}
        />
      </FormSection>
    );
  }
}

export default NestedResource;
