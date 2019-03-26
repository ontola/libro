import {
  linkType,
  lrsType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import { Term } from 'rdflib';
import React from 'react';

import { FormContext } from '../../components/Form/Form';
import { collectionMembers } from '../../helpers/diggers';
import {
  calculateFormFieldName,
  retrieveIdFromValue,
} from '../../helpers/forms';
import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

import DataField from './PropertyShape/DataField';
import NestedResource from './PropertyShape/NestedResource';

class PropertyShape extends React.Component {
  static contextType = FormContext;

  static type = NS.sh('PropertyShape');

  static topology = allTopologies;

  static mapDataToProps = [
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

  static propTypes = {
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
    targetNode: subjectType,
    targetValue: PropTypes.shape({
      '@id': linkType,
    }),
    theme: PropTypes.string,
  };

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const {
      lrs,
      path,
      propertyIndex,
      targetNode,
    } = this.props;

    const fieldName = calculateFormFieldName(propertyIndex, path);
    const targetObject = targetNode || retrieveIdFromValue(this.props.targetValue);
    const targetIRI = targetObject && targetObject instanceof Term && targetObject;
    let targetValues = targetIRI && lrs.getResourceProperties(targetIRI, path) ?? [];
    const isCollection = targetValues?.length === 1
      && lrs.findSubject(targetValues[0], [NS.rdf('type')], NS.as('Collection')).length > 0;

    if (isCollection) {
      targetValues = lrs.dig(targetValues[0], collectionMembers);
    }

    if (this.props.class) {
      return (
        <NestedResource
          {...this.props}
          fieldName={fieldName}
          targetValues={targetValues}
        />
      );
    } else if (this.props.datatype) {
      return (
        <DataField
          {...this.props}
          fieldName={fieldName}
          targetValues={targetValues}
        />
      );
    }

    return null;
  }
}

export default [
  register(PropertyShape),
];
