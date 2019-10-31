import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  Property,
  link,
  linkType,
  lrsType,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import {
  BlankNode,
  NamedNode,
  Term,
} from 'rdflib';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import Button from '../../components/Button';
import { LoadingWidgetContent } from '../../components/Loading';
import { NS } from '../../helpers/LinkedRenderStore';
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
  targetNode: PropTypes.oneOfType([
    PropTypes.instanceOf(BlankNode),
    PropTypes.instanceOf(NamedNode),
  ]),
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
  const targetIRI = targetObject && targetObject instanceof Term && targetObject;

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
      label={NS.sh('targetClass')}
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
        <Property label={NS.rdfs('label')} />
        <Property label={NS.sh('targetClass')} />
        <Property
          autofocusForm={autofocusForm}
          invalidFields={invalidFields}
          label={[NS.sh('property'), NS.ontola('formSteps')]}
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
    [NS.sh('targetNode')],
    { forceRender: true }
  )(NodeShape),
  NS.sh('NodeShape'),
  RENDER_CLASS_NAME,
  allTopologies
);
