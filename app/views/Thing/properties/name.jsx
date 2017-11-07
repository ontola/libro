import React from 'react';

import {
  Heading,
  LDLink,
} from '../../../components';
import LinkedRenderStore, { linkedPropVal, NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const Name = ({ linkedProp }) => <Heading size="1">{linkedProp}</Heading>;

Name.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Name,
  NS.schema('Thing'),
  [
    NS.schema('name'),
    NS.rdfs('label'),
    NS.foaf('name'),
  ]
);

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <LDLink>{linkedProp}</LDLink>,
  NS.schema('Thing'),
  [
    NS.schema('name'),
    NS.rdfs('label'),
    NS.foaf('name'),
  ],
  NS.argu('inline')
);
export default Name;
