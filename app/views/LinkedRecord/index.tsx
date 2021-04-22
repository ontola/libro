import rdf, { NamedNode, isNamedNode } from '@ontologies/core';
import * as owl from '@ontologies/owl';
import * as rdfx from '@ontologies/rdf';
import { RENDER_CLASS_NAME } from 'link-lib';
import {
  FC,
  Resource,
  ReturnType,
  register,
  useLinkRenderContext,
  useProperty,
  useView,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import argu from '../../ontology/argu';
import { allTopologies } from '../../topologies';

interface LinkedRecordProps {
  sameAs: NamedNode;
}

const LinkedRecord: FC<LinkedRecordProps> = ({
  sameAs,
  subject,
}) => {
  const { topology } = useLinkRenderContext();
  const types = useProperty(rdfx.type, { returnType: ReturnType.AllTerms });
  const nonLRTypes = types
    .filter((iri) => !rdf.equals(iri, argu.LinkedRecord))
    .filter(isNamedNode);
  const View = useView(nonLRTypes, RENDER_CLASS_NAME, topology);

  if (!View && rdf.equals(subject, sameAs)) {
    return (
      <p>
        <FormattedMessage
          defaultMessage="Error rendering external resource."
          id="https://app.argu.co/i18n/errors/lr/circularRender"
        />
      </p>
    );
  }

  if (View) {
    return <View />;
  }

  return <Resource subject={sameAs} />;
};

LinkedRecord.type = argu.LinkedRecord;

LinkedRecord.topology = allTopologies;

LinkedRecord.mapDataToProps = {
  sameAs: owl.sameAs,
};

export default [
  register(LinkedRecord),
];
