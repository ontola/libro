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

const useTargetValues = (targetObject, path) => {
  const lrs = useLRS();

  const targetIRI = isTerm(targetObject) && targetObject;
  const rawTargetValues = (targetIRI && lrs.getResourceProperties(targetIRI, path)) || [];
  const [targetValues, setTargetValues] = React.useState(Promise.resolve());
  useDataInvalidation({
    dataSubjects: (rawTargetValues || []).filter((s) => ['NamedNode', 'TermType'].includes(s.termType)),
    subject: targetIRI,
  });

  React.useEffect(() => {
    const isCollection = rawTargetValues?.length === 1
      && lrs.findSubject(rawTargetValues[0], [rdfx.type], as.Collection).length > 0;

    if (!isCollection
      && rawTargetValues?.length === 1
      && rawTargetValues[0].termType === 'NamedNode'
      && !entityIsLoaded(lrs, rawTargetValues[0])) {
      if (__CLIENT__) {
        setTargetValues(lrs.getEntity(rawTargetValues[0]));
      }
    } else if (isCollection) {
      setTargetValues(lrs.dig(rawTargetValues[0], collectionMembers));
    } else {
      setTargetValues(rawTargetValues);
    }
  }, []);

  return targetValues;
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
  const targetObject = targetNode || retrieveIdFromValue(targetValue);
  const targetValues = useTargetValues(targetObject, path);

  if (isPromise(targetValues)) {
    return <LoadingRow />;
  }

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
