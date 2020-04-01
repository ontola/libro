import rdfs from '@ontologies/rdfs';
import { isTerm } from '@ontologies/core';
import sh from '@ontologies/shacl';
import { nodeType } from '@rdfdev/prop-types';
import {
  Property,
  linkType,
  lrsType,
  register,
  subjectType,
  useDataInvalidation,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import Button from '../../components/Button';
import { LoadingGridContent } from '../../components/Loading';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';
import { isMarkedForRemove, retrieveIdFromValue } from '../../helpers/forms';
import { entityIsLoaded } from '../../helpers/data';

const propTypes = {
  autofocusForm: PropTypes.bool,
  lrs: lrsType,
  nestedShape: PropTypes.bool,
  onKeyUp: PropTypes.func,
  propertyIndex: PropTypes.number,
  removeItem: PropTypes.func,
  subject: subjectType,
  targetNode: nodeType,
  targetValue: PropTypes.shape({
    '@id': linkType,
  }),
  theme: PropTypes.string,
  /** The ids of the whitelisted properties */
  whitelist: PropTypes.arrayOf(PropTypes.number),
};

const defaultProps = {
  autofocusForm: false,
};

const NodeShape = ({
  autofocusForm,
  lrs,
  nestedShape,
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

  useDataInvalidation([targetIRI]);

  if (targetIRI && targetIRI.termType !== 'BlankNode' && !entityIsLoaded(lrs, targetIRI)) {
    if (__CLIENT__) {
      lrs.queueEntity(targetIRI);

      return <LoadingGridContent />;
    }
  }

  return (
    <Property
      forceRender
      autofocusForm={autofocusForm}
      label={sh.targetClass}
      propertyIndex={propertyIndex}
      removeItem={removeItem}
      targetNode={targetNode}
      targetValue={targetValue}
      theme={theme}
      whitelist={whitelist}
      onKeyUp={onKeyUp}
    >
      <div className={`NodeShape ${nestedShape ? 'NestedShape' : ''}`} style={removeItem ? { display: 'flex' } : undefined}>
        <Property label={rdfs.label} />
        <Property label={sh.targetClass} />
        <Property
          autofocusForm={autofocusForm}
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

NodeShape.type = sh.NodeShape;

NodeShape.topology = allTopologies;

NodeShape.mapDataToProps = {
  targetNode: sh.targetNode,
};

NodeShape.linkOpts = {
  forceRender: true,
};

NodeShape.propTypes = propTypes;

NodeShape.defaultProps = defaultProps;

export default register(NodeShape);
