import React from 'react';

import {
  Heading,
} from 'components';
import LinkedRenderStore, { linkedPropVal } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const Name = ({ linkedProp }) => <Heading size="1">{linkedProp}</Heading>;

Name.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Name,
  'http://schema.org/Thing',
  [
    'http://schema.org/name',
    'http://www.w3.org/2000/01/rdf-schema#label',
    'http://xmlns.com/foaf/0.1/name',
  ]
);

export default Name;
