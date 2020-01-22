import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import {
  Resource,
  linkedPropType,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { NOT_ACCEPTABLE } from 'http-status-codes';

import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../../helpers/iris';
import dbo from '../../../ontology/dbo';
import wdt from '../../../ontology/wdt';
import { allTopologies } from '../../../topologies';
import Image from '../../../components/Image';

const propTypes = {
  ariaLabel: PropTypes.string,
  children: PropTypes.node,
  linkedProp: linkedPropType,
};

const ThingImageProp = ({
  ariaLabel,
  children,
  linkedProp,
}) => {
  const lrs = useLRS();
  if (linkedProp) {
    useDataInvalidation({ subject: linkedProp });
  }

  if (children) {
    return <Resource subject={linkedProp}>{children}</Resource>;
  }

  if (!linkedProp) {
    return null;
  } else if (lrs.api.statusMap[linkedProp.id]?.status === NOT_ACCEPTABLE) {
    return <Image ariaLabel={ariaLabel} linkedProp={linkedProp} />;
  } else if (linkedProp
    && Object.keys(linkedProp).length === 0
    && linkedProp.constructor === Object
  ) {
    return <div>image</div>;
  } else if (linkedProp.termType === 'NamedNode' && isFontAwesomeIRI(linkedProp.value)) {
    return <FontAwesome name={normalizeFontAwesomeIRI(linkedProp)} />;
  }

  return (
    <Resource ariaLabel={ariaLabel} subject={linkedProp} />
  );
};

ThingImageProp.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  ThingImageProp,
  schema.Thing,
  [schema.image, dbo.thumbnail, wdt.ns('P18')],
  allTopologies
);
