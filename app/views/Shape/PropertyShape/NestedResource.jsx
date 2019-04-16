import {
  LinkedResourceContainer,
  linkType,
  lrsType,
  Property,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import { BlankNode } from 'rdflib';
import React from 'react';
import { Field, FormSpy } from 'react-final-form';

import Button from '../../../components/Button';
import FieldLabel from '../../../components/FieldLabel';
import { FormContext } from '../../../components/Form/Form';
import FormSection from '../../../components/Form/FormSection';
import {
  clearRemoval,
  destroyFieldName,
  isMarkedForRemove,
  markForRemove,
} from '../../../helpers/forms';
import { NS } from '../../../helpers/LinkedRenderStore';
import { tryParseInt } from '../../../helpers/numbers';
import { omniformSupplementBarTopology } from '../../../topologies/OmniformSupplementBar/OmniformSupplementBar';

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
          removeItem: showRemoveItem ? removeItem(index) : undefined,
          targetValue: v,
        }));

      return (
        <React.Fragment>
          {this.labelComponent(theme !== 'omniform' || value.length > 0)}
          {this.descriptionComponent()}
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

      /* Render an inline dummy if the current object is removed. The input field has no new button
       *  be always visible.
       */
      const displayValue = isMarkedForRemove(input.value) ? { '@id': new BlankNode() } : undefined;

      const showAddButton = !inputAlwaysVisible && (!input.value || isMarkedForRemove(input.value));

      const addItem = () => {
        input.onChange({
          '@id': new BlankNode(),
        });
      };

      const present = input.value?.termType || Object.values(input.value || {}).find(Boolean);
      const showRemoveItem = !displayValue && (present || !inputAlwaysVisible)
        && (minCount ? tryParseInt(minCount) === 0 : true);
      const removeItem = (e) => {
        if (e && typeof e.preventDefault === 'function') {
          e.preventDefault();
        }
        Object.keys(input.value).map(field => sessionStorage.removeItem(`${this.context}.${field}`));
        input.onChange(markForRemove(input.value));
      };

      return (
        <React.Fragment>
          {this.labelComponent(theme !== 'omniform' || !!input.value)}
          {this.descriptionComponent()}
          {(input.value || inputAlwaysVisible) && this.nestedResourceView({
            removeItem: showRemoveItem ? removeItem : undefined,
            targetValue: displayValue ?? input.value ?? { '@id': input.value },
          })}
          <FormSpy
            subscription={{
              values: true,
            }}
            onChange={(formApi) => {
              const nextValue = formApi.values?.[input.name];
              if (nextValue && isMarkedForRemove(nextValue)) {
                const {
                  '@id': Ignored,
                  [destroyFieldName]: ignored,
                  ...rest
                } = nextValue;

                if (Object.keys(rest).length > 0) {
                  input.onChange(clearRemoval(nextValue));
                }
              }
            }}
          />
          {showAddButton && this.addButton(addItem)}
        </React.Fragment>
      );
    };
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
}

export default NestedResource;
