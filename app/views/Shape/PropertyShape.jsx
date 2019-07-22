import {
  linkType,
  lrsType,
  register,
  subjectType,
  useDataInvalidation,
} from 'link-redux';
import PropTypes from 'prop-types';
import { Term } from 'rdflib';
import React from 'react';

import { collectionMembers } from '../../helpers/diggers';
import {
  calculateFormFieldName,
  retrieveIdFromValue,
} from '../../helpers/forms';
import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

import DataField from './PropertyShape/DataField';
import NestedResource from './PropertyShape/NestedResource';

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
  const targetIRI = targetObject && targetObject instanceof Term && targetObject;
  let targetValues = targetIRI && lrs.getResourceProperties(targetIRI, path) ?? [];
  const isCollection = targetValues?.length === 1
    && lrs.findSubject(targetValues[0], [NS.rdf('type')], NS.as('Collection')).length > 0;
  useDataInvalidation({
    dataSubjects: targetValues.filter(s => ['NamedNode', 'TermType'].includes(s.termType)),
    subject,
  });

  if (!isCollection && targetValues?.length === 1 && targetValues[0].termType === 'NamedNode' && lrs.tryEntity(targetValues[0]).length === 0) {
    if (__CLIENT__) {
      lrs.queueEntity(targetValues[0]);
    }

    return null;
  }

  if (isCollection) {
    targetValues = lrs.dig(targetValues[0], collectionMembers);
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

PropertyShape.type = NS.sh('PropertyShape');

PropertyShape.topology = allTopologies;

PropertyShape.mapDataToProps = {
  class: NS.sh('class'),
  datatype: NS.sh('datatype'),
  defaultValue: {
    label: NS.sh('defaultValue'),
    limit: Infinity,
  },
  description: NS.sh('description'),
  maxCount: NS.sh('maxCount'),
  maxLength: NS.sh('maxLength'),
  minCount: NS.sh('minCount'),
  minLength: NS.sh('minLength'),
  name: NS.sh('name'),
  path: NS.sh('path'),
  shIn: { label: NS.sh('in') },
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
