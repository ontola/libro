import as from '@ontologies/as';
import { isTerm } from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import sh from '@ontologies/shacl';
import {
  linkType,
  lrsType,
  register,
  subjectType,
  useDataInvalidation,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { LoadingRow } from '../../components/Loading';
import { collectionMembers } from '../../helpers/diggers';
import {
  calculateFormFieldName,
  retrieveIdFromValue,
} from '../../helpers/forms';
import { NS } from '../../helpers/LinkedRenderStore';
import { isPromise } from '../../helpers/types';
import { allTopologies } from '../../topologies';
import { entityIsLoaded } from '../../helpers/data';

import DataField from './PropertyShape/DataField';
import NestedResource from './PropertyShape/NestedResource';

const getTargetValues = (lrs, rawTargetValues) => {
  const isCollection = rawTargetValues?.length === 1
    && lrs.findSubject(rawTargetValues[0], [rdfx.type], as.Collection).length > 0;

  if (!isCollection
    && rawTargetValues?.length === 1
    && rawTargetValues[0].termType === 'NamedNode'
    && !entityIsLoaded(lrs, rawTargetValues[0])) {
    if (__CLIENT__) {
      return lrs.getEntity(rawTargetValues[0]);
    }
  }

  if (isCollection) {
    return lrs.dig(rawTargetValues[0], collectionMembers);
  }

  return rawTargetValues;
};

const PropertyShape = (props) => {
  const {
    datatype,
    lrs,
    path,
    propertyIndex,
    subject,
    targetNode,
    targetValue,
  } = props;

  const fieldName = calculateFormFieldName(propertyIndex, path);
  const targetObject = targetNode || retrieveIdFromValue(targetValue);
  const targetIRI = isTerm(targetObject) && targetObject;
  const rawTargetValues = (targetIRI && lrs.getResourceProperties(targetIRI, path)) || [];
  useDataInvalidation({
    dataSubjects: [
      targetIRI,
      ...(rawTargetValues || []).filter(s => ['NamedNode', 'TermType'].includes(s.termType)),
    ],
    subject,
  });
  const targetValues = getTargetValues(lrs, rawTargetValues);

  if (isPromise(targetValues)) {
    return <LoadingRow />;
  }

  if (props.class) {
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

PropertyShape.type = sh.PropertyShape;

PropertyShape.topology = allTopologies;

PropertyShape.mapDataToProps = {
  class: sh.class,
  datatype: sh.datatype,
  defaultValue: {
    label: sh.defaultValue,
    limit: Infinity,
  },
  description: sh.description,
  inputFieldHint: NS.ontola('inputFieldHint'),
  maxCount: sh.maxCount,
  maxLength: sh.maxLength,
  minCount: sh.minCount,
  minLength: sh.minLength,
  name: sh.name,
  path: sh.path,
  shIn: { label: sh.in },
};

PropertyShape.propTypes = {
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
  subject: subjectType,
  targetNode: subjectType,
  targetValue: PropTypes.shape({
    '@id': linkType,
  }),
  theme: PropTypes.string,
};

export default [
  register(PropertyShape),
];
