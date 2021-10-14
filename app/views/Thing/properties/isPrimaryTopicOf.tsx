import { isNamedNode } from '@ontologies/core';
import * as foaf from '@ontologies/foaf';
import * as schema from '@ontologies/schema';
import { PropertyProps, register } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { isDifferentWebsite } from '../../../helpers/iris';
import { allTopologies } from '../../../topologies';

const IsPrimaryTopicOf = ({ linkedProp }: PropertyProps): JSX.Element | null => {
  if (!isNamedNode(linkedProp)) {
    return null;
  }

  const target = isDifferentWebsite(linkedProp) ? '_blank' : undefined;

  return (
    <a
      href={linkedProp.value}
      target={target}
    >
      <FormattedMessage
        defaultMessage="External information"
        id="https://app.argu.co/i18n/schema:Thing/foaf:isPrimaryTopicOf/externalLabel"
      />
    </a>
  );
};

IsPrimaryTopicOf.type = schema.Thing;

IsPrimaryTopicOf.property = foaf.isPrimaryTopicOf;

IsPrimaryTopicOf.topology = allTopologies;

export default register(IsPrimaryTopicOf);
