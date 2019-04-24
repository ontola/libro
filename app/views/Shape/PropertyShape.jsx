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
  useDataInvalidation({ dataSubjects: targetValues, subject });
  if (!isCollection && targetValues?.length === 1 && targetValues[0].termType === 'NamedNode' && lrs.tryEntity(targetValues[0]).length === 0) {
    lrs.queueEntity(targetValues[0]);
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

PropertyShape.mapDataToProps = [
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
