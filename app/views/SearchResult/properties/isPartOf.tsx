import rdf, { NamedNode } from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
  Resource,
  useResourceProperty,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import argu from '../../../ontology/argu';
import { inlineTopology } from '../../../topologies/Inline';

const IsPartOfPage: FC<PropertyProps> = ({ linkedProp }) => {
  const [parentType] = useResourceProperty(linkedProp as NamedNode, rdfx.type);

  if (rdf.equals(parentType, argu.Page)) {
    return null;
  }

  return (
    <React.Fragment>
      <FormattedMessage
        defaultMessage="Search in:"
        id="https://app.argu.co/i18n/search/header/prefix"
      />
      <Resource subject={linkedProp} topology={inlineTopology} />
    </React.Fragment>
  );
};

IsPartOfPage.type = argu.SearchResult;

IsPartOfPage.property = schema.isPartOf;

IsPartOfPage.topology = argu.container;

export default register(IsPartOfPage);
