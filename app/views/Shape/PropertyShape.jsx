import { isTerm } from '@ontologies/core';
import sh from '@ontologies/shacl';
import {
  ReturnType,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { LoadingRow } from '../../components/Loading';
import {
  calculateFormFieldName,
  retrieveIdFromValue,
} from '../../helpers/forms';
import { isPromise } from '../../helpers/types';
import useTargetValues from '../../hooks/useTargetValues';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';

import DataField from './PropertyShape/DataField';
import NestedResource from './PropertyShape/NestedResource';

export const PropertyShapeTarget = ({
  children,
  path,
  targetIRI,
}) => {
  const targetValues = useTargetValues(targetIRI, path);

  if (isPromise(targetValues)) {
    return <LoadingRow />;
  }

  return children(targetValues);
};

const PropertyShape = (props) => {
  const {
    datatype,
    path,
    propertyIndex,
    shClass,
    targetNode,
    targetValue,
  } = props;
  const fieldName = calculateFormFieldName(propertyIndex, path);
  const targetObject = retrieveIdFromValue(targetValue) || targetNode;
  const targetIRI = isTerm(targetObject) && targetObject;

  const childContent = (targetValues) => {
    if (shClass) {
      return (
        <NestedResource
          {...props}
          fieldName={fieldName}
          targetValues={targetValues}
        />
      );
    } else if (datatype) {
      return (
        <DataField
          {...props}
          fieldName={fieldName}
          targetValues={targetValues}
        />
      );
    }

    return null;
  };

  if (targetIRI) {
    return (
      <PropertyShapeTarget path={path} targetIRI={targetIRI}>
        {(targetValues) => childContent(targetValues)}
      </PropertyShapeTarget>
    );
  }

  return childContent([]);
};

PropertyShape.type = sh.PropertyShape;

PropertyShape.topology = allTopologies;

PropertyShape.mapDataToProps = {
  datatype: sh.datatype,
  defaultValue: {
    label: sh.defaultValue,
    returnType: ReturnType.AllTerms,
  },
  description: sh.description,
  helperText: ontola.helperText,
  inputFieldHint: ontola.inputFieldHint,
  maxCount: sh.maxCount,
  maxLength: sh.maxLength,
  minCount: sh.minCount,
  minLength: sh.minLength,
  name: sh.name,
  path: sh.path,
  shClass: sh.class,
  shIn: { label: sh.in },
};

PropertyShape.propTypes = {
  autofocus: PropTypes.bool,
  datatype: linkType,
  defaultValue: linkType,
  description: linkType,
  helperText: linkType,
  in: linkType,
  maxCount: linkType,
  maxLength: linkType,
  minCount: linkType,
  minLength: linkType,
  name: linkType,
  onKeyUp: PropTypes.func,
  path: linkType,
  propertyIndex: PropTypes.number,
  shClass: linkType,
  targetNode: subjectType,
  targetValue: PropTypes.shape({
    '@id': linkType,
  }),
  theme: PropTypes.string,
};

export default [
  register(PropertyShape),
];
