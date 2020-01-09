import schema from '@ontologies/schema';
import { ACCEPTED } from 'http-status-codes';
import LinkedRenderStore from 'link-lib';
import {
  Resource,
  linkedPropType,
  register,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import React from 'react';

import { LDLink } from '../../../components';
import { LoadingCoverPhoto } from '../../../components/Loading';
import ontola from '../../../ontology/ontola';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';

const propTypes = {
  linkedProp: linkedPropType,
};

const ClickableCover = ({ linkedProp }) => (
  <LDLink>
    <Resource subject={linkedProp} />
  </LDLink>
);

ClickableCover.propTypes = propTypes;

const CoverPhotoOrLoading = ({ linkedProp }) => {
  useDataInvalidation({ subject: linkedProp });

  const lrs = useLRS();
  const status = lrs.getStatus(linkedProp);

  if (status.status === ACCEPTED || lrs.shouldLoadResource(linkedProp)) {
    return (
      <Resource forceRender subject={linkedProp}>
        <LoadingCoverPhoto />
      </Resource>
    );
  }

  return <Resource subject={linkedProp} />;
};

CoverPhotoOrLoading.type = schema.Thing;

CoverPhotoOrLoading.property = ontola.coverPhoto;

CoverPhotoOrLoading.topology = cardFixedTopology;

CoverPhotoOrLoading.propTypes = propTypes;

export default [
  register(CoverPhotoOrLoading),
  LinkedRenderStore.registerRenderer(
    ClickableCover,
    schema.Thing,
    ontola.coverPhoto,
    cardTopology
  ),
];
