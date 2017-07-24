import React from 'react';
import { getValueOrID } from 'link-lib';
import { contextTypes, getLinkedObjectPropertyRaw, LinkedObjectContainer } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';
import {
  Columns,
} from 'components';

const Views = (props, context) => {
  const prop = getLinkedObjectPropertyRaw(props.label, props, context);
  if (typeof prop === 'string') {
    return <LinkedObjectContainer object={prop} />;
  }
  const obs = prop.map(iri => <LinkedObjectContainer object={getValueOrID(iri)} />);
  if (obs && obs.length > 1) {
    return <Columns>{obs}</Columns>;
  } else if (obs) {
    return <div>{obs}</div>;
  }
  return null;
};

Views.contextTypes = contextTypes;

LinkedRenderStore.registerRenderer(
  Views,
  'argu:Collection',
  'argu:views'
);
LinkedRenderStore.registerRenderer(
  Views,
  'argu:Collection',
  'argu:views',
  'argu:section'
);

export default Views;
