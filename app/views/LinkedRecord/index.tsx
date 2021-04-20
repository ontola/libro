import rdf, { NamedNode } from '@ontologies/core';
import * as owl from '@ontologies/owl';
import {
  FC,
  Resource,
  register,
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
  if (rdf.equals(subject, sameAs)) {
    return (
      <p>
        <FormattedMessage
          defaultMessage="Error rendering external resource."
          id="https://app.argu.co/i18n/errors/lr/circularRender"
        />
      </p>
    );
  }

  return (
    <Resource subject={sameAs} />
  );
};

LinkedRecord.type = argu.LinkedRecord;

LinkedRecord.topology = allTopologies;

LinkedRecord.mapDataToProps = {
  sameAs: owl.sameAs,
};

export default [
  register(LinkedRecord),
];
