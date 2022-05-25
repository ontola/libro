import { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  PropertyProps,
  register,
  useGlobalIds,
  useStrings,
} from 'link-redux';
import React from 'react';

import Detail from '../../../components/Detail';
import { NAME_PREDICATES, TEXT_PREDICATES } from '../../../helpers/metaData';
import ontola from '../../../ontology/ontola';
import { detailsBarTopology } from '../../../topologies';

const MAX_TEXT_LENGTH = 200;

const ParentDetail = ({ linkedProp }: PropertyProps): JSX.Element | null => {
  const [breadcrumb] = useGlobalIds(ontola.breadcrumb);
  const [name] = useStrings(isNamedNode(linkedProp) ? linkedProp : undefined, NAME_PREDICATES);
  const [text] = useStrings(isNamedNode(linkedProp) ? linkedProp : undefined, TEXT_PREDICATES);
  const trimmedText = text?.length > MAX_TEXT_LENGTH ? `${text?.substring(0, MAX_TEXT_LENGTH)}...` : text;

  if (!isNamedNode(linkedProp)) {
    return null;
  }

  return (
    <Detail
      icon="reply"
      text={name}
      title={trimmedText}
      url={(breadcrumb ?? linkedProp).value}
    />
  );
};

ParentDetail.type = schema.Thing;

ParentDetail.property = schema.isPartOf;

ParentDetail.topology = detailsBarTopology;

export default register(ParentDetail);
