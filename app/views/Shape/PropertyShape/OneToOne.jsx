import RDFTypes from '@rdfdev/prop-types';
import rdf from '@ontologies/core';
import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { FormSpy } from 'react-final-form';

import {
  clearRemoval,
  destroyFieldName,
  isMarkedForRemove,
  markForRemove,
} from '../../../helpers/forms';
import { tryParseInt } from '../../../helpers/numbers';

const OneToOneRenderer = ({
  addButton,
  context,
  descriptionComponent,
  input,
  labelComponent,
  maxCount,
  minCount,
  nestedResourceView,
  theme,
}) => {
  const {
    name,
    onChange,
    value,
  } = input;
  const parsedMinCount = tryParseInt(minCount);
  const parsedMaxCount = tryParseInt(maxCount);
  const showAddButton = (!value || isMarkedForRemove(value));
  const inputAlwaysVisible = parsedMinCount && parsedMinCount > 0;
  const addItem = () => {
    onChange({
      '@id': rdf.blankNode(),
    });
  };

  useEffect(() => {
    if (isMarkedForRemove(value) && inputAlwaysVisible) {
      addItem();
    }
  });

  const present = value?.termType || Object.values(value || {}).find(Boolean);
  const showRemoveItem = present
    && (parsedMinCount ? parsedMinCount === 0 : true);
  const removeItem = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    if (__CLIENT__) {
      Object
        .keys(value)
        .map(field => sessionStorage.removeItem(`${context}.${field}`));
    }
    onChange(markForRemove(value));
  };

  return (
    <React.Fragment>
      {labelComponent(theme !== 'omniform' || !!value)}
      {descriptionComponent()}
      {value && nestedResourceView({
        nestedShape: parsedMaxCount !== 1 && parsedMinCount !== 1,
        removeItem: showRemoveItem ? removeItem : undefined,
        targetValue: value,
      })}
      <FormSpy
        subscription={{
          values: true,
        }}
        onChange={(formApi) => {
          const nextValue = formApi.values?.[name];
          if (nextValue && isMarkedForRemove(nextValue)) {
            const {
              '@id': Ignored,
              [destroyFieldName]: ignored,
              ...rest
            } = nextValue;

            if (Object.keys(rest).length > 0) {
              onChange(clearRemoval(nextValue));
            }
          }
        }}
      />
      {showAddButton && addButton(addItem)}
    </React.Fragment>
  );
};

OneToOneRenderer.propTypes = {
  addButton: PropTypes.func,
  context: linkType,
  descriptionComponent: PropTypes.func,
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
  nestedResourceView: PropTypes.func,
  theme: PropTypes.string,
};

export default OneToOneRenderer;
