import * as foaf from '@ontologies/foaf';
import * as schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { isDifferentWebsite } from '../../../helpers/iris';
import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

const IsPrimaryTopicOf = ({ linkedProp }) => {
  if (!linkedProp) {
    return null;
  }

  const target = isDifferentWebsite(linkedProp) ? '_blank' : undefined;

  return (
    <a href={linkedProp.value} target={target}>
      <FormattedMessage
        defaultMessage="External information"
        id="https://app.argu.co/i18n/schema:Thing/foaf:isPrimaryTopicOf/externalLabel"
      />
    </a>
  );
};

IsPrimaryTopicOf.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  IsPrimaryTopicOf,
  schema.Thing,
  foaf.isPrimaryTopicOf,
  allTopologies
);
