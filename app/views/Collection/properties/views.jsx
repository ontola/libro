import LinkedRenderStore from 'link-lib';
import {
  LinkedResourceContainer,
  contextTypes,
  labelType,
  subjectType
} from 'link-redux';
import React from 'react';

import {
  Columns,
} from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';

const Views = (props, context) => {
  const prop = context.linkedRenderStore.getResourcePropertyRaw(props.subject, props.label);
  if (typeof prop === 'string') {
    return <LinkedResourceContainer subject={prop} />;
  }
  const obs = prop.map(iri => <LinkedResourceContainer subject={iri.object} />);
  if (obs && obs.length > 1) {
    return <Columns>{obs}</Columns>;
  } else if (obs) {
    return <div>{obs}</div>;
  }
  return null;
};

Views.contextTypes = contextTypes;
Views.propTypes = {
  label: labelType.isRequired,
  subject: subjectType
};
export default [
  LinkedRenderStore.registerRenderer(
    Views,
    NS.argu('Collection'),
    NS.argu('views')
  ),
  LinkedRenderStore.registerRenderer(
    Views,
    NS.argu('Collection'),
    NS.argu('views'),
    NS.argu('section')
  ),
];
