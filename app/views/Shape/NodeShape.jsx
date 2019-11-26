import { nodeType } from '@ontola/mash';
import rdfs from '@ontologies/rdfs';
import { isTerm } from '@ontologies/core';
import sh from '@ontologies/shacl';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  Property,
  link,
  linkType,
  lrsType,
  subjectType,
  useDataInvalidation,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import Button from '../../components/Button';
import { LoadingWidgetContent } from '../../components/Loading';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';
import { isMarkedForRemove, retrieveIdFromValue } from '../../helpers/forms';
import { entityIsLoaded } from '../../helpers/data';

const propTypes = {
  autofocusForm: PropTypes.bool,
  invalidFields: PropTypes.arrayOf(PropTypes.string),
  lrs: lrsType,
  onKeyUp: PropTypes.func,
  propertyIndex: PropTypes.number,
  removeItem: PropTypes.func,
  subject: subjectType,
  targetNode: nodeType,
  targetValue: PropTypes.shape({
    '@id': linkType,
  }),
  theme: PropTypes.string,
  whitelist: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
  autofocusForm: false,
};

const NodeShape = ({
  autofocusForm,
  invalidFields,
  lrs,
  onKeyUp,
  propertyIndex,
  removeItem,
  subject,
  targetNode,
  targetValue,
  theme,
  whitelist,
}) => {
  if (targetValue && isMarkedForRemove(targetValue)) {
    return null;
  }

  const targetObject = targetNode || retrieveIdFromValue(targetValue);
  const targetIRI = isTerm(targetObject) && targetObject;

  useDataInvalidation({ subject: targetIRI });

  if (targetIRI && targetIRI.termType !== 'BlankNode' && !entityIsLoaded(lrs, targetIRI)) {
    if (__CLIENT__) {
      lrs.getEntity(targetIRI);

      return <LoadingWidgetContent />;
    }
  }

  return (
    <Property
      forceRender
      autofocusForm={autofocusForm}
      label={sh.targetClass}
      lrs={lrs}
      propertyIndex={propertyIndex}
      removeItem={removeItem}
      targetNode={targetNode}
      targetValue={targetValue}
      theme={theme}
      whitelist={whitelist}
      onKeyUp={onKeyUp}
    >
      <div className="NodeShape" style={removeItem ? { display: 'flex' } : undefined}>
        <Property label={rdfs.label} />
        <Property label={sh.targetClass} />
        <Property
          autofocusForm={autofocusForm}
          invalidFields={invalidFields}
          label={[sh.property, ontola.formSteps]}
          propertyIndex={propertyIndex}
          subject={subject}
          targetNode={targetNode}
          targetValue={targetValue}
          theme={theme}
          whitelist={whitelist}
          onKeyUp={onKeyUp}
        />
        {removeItem && (
          <Button
            narrow
            plain
            onClick={removeItem}
          >
            <FontAwesome name="times" />
          </Button>
        )}
      </div>
    </Property>
  );
};

NodeShape.propTypes = propTypes;
NodeShape.defaultProps = defaultProps;

export default LinkedRenderStore.registerRenderer(
  link(
    [sh.targetNode],
    { forceRender: true }
  )(NodeShape),
  sh.NodeShape,
  RENDER_CLASS_NAME,
  allTopologies
);
