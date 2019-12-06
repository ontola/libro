import RDFTypes from '@rdfdev/prop-types';
import rdf from '@ontologies/core';
import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { useField } from 'react-final-form';

import { tryParseInt } from '../../../helpers/numbers';
import { markForRemove } from '../../../helpers/forms';

const OneToManyRenderer = ({
  NestedResourceView,
  addButton,
  descriptionElement,
  fieldName,
  initialValue,
  labelComponent,
  maxCount,
  minCount,
  theme,
}) => {
  const { input } = useField(
    fieldName,
    {
      allowNull: true,
      format: i => i,
      initialValue,
      name: fieldName,
    }
  );
  const { onChange, value } = input;
  const showAddButton = maxCount
    ? value.length < tryParseInt(maxCount)
    : true;

  const addItem = () => {
    const next = value ? [...value] : [];
    next.push({
      '@id': rdf.blankNode(),
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

  const children = value.map((v, index) => (
    <NestedResourceView
      nestedShape
      key={v?.['@id'] || index}
      propertyIndex={index}
      removeItem={showRemoveItem ? removeItem(index) : undefined}
      targetValue={v}
    />
  ));

  return (
    <React.Fragment>
      {labelComponent(theme !== 'omniform' || value.length > 0)}
      {descriptionElement}
      {children}
      {showAddButton && addButton(addItem)}
    </React.Fragment>
  );
};

OneToManyRenderer.propTypes = {
  NestedResourceView: PropTypes.elementType,
  addButton: PropTypes.func,
  descriptionElement: PropTypes.element,
  fieldName: PropTypes.string,
  initialValue: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        '@id': RDFTypes.nodeType,
      }),
    ])
  ),
  input: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      RDFTypes.literal,
      RDFTypes.namedNode,
      PropTypes.oneOf([null]),
    ]),
  }),
  labelComponent: PropTypes.func,
  maxCount: linkType,
  minCount: linkType,
  theme: PropTypes.string,
};

export default OneToManyRenderer;
