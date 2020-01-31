import as from '@ontologies/as';
import { isTerm } from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import sh from '@ontologies/shacl';
import {
  linkType,
  register,
  subjectType,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { LoadingRow } from '../../components/Loading';
import { collectionMembers } from '../../helpers/diggers';
import {
  calculateFormFieldName,
  retrieveIdFromValue,
} from '../../helpers/forms';
import { isPromise } from '../../helpers/types';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';
import { entityIsLoaded } from '../../helpers/data';

import DataField from './PropertyShape/DataField';
import NestedResource from './PropertyShape/NestedResource';

const useTargetValues = (rawTargetValues, targetIRI) => {
  const lrs = useLRS();

  useDataInvalidation({
    dataSubjects: rawTargetValues.filter((s) => ['NamedNode', 'TermType'].includes(s.termType)),
    subject: targetIRI,
  });

  const isCollection = rawTargetValues?.length === 1
    && lrs.findSubject(rawTargetValues[0], [rdfx.type], as.Collection).length > 0;

  if (!isCollection
    && rawTargetValues?.length === 1
    && rawTargetValues[0].termType === 'NamedNode'
    && !entityIsLoaded(lrs, rawTargetValues[0])) {
    if (__CLIENT__) {
      lrs.queueEntity(rawTargetValues[0]);

      return Promise.resolve();
    }
  } else if (isCollection) {
    return lrs.dig(rawTargetValues[0], collectionMembers);
  }

  return rawTargetValues;
};

const PropertyShapeTarget = ({
  children,
  targetIRI,
  rawTargetValues,
}) => {
  const targetValues = useTargetValues(rawTargetValues, targetIRI);

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
  const lrs = useLRS();
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
    const rawTargetValues = lrs.getResourceProperties(targetIRI, path);

    return (
      <PropertyShapeTarget rawTargetValues={rawTargetValues} targetIRI={targetIRI}>
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
    limit: Infinity,
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
