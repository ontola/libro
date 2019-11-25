import schema from '@ontologies/schema';
import { ACCEPTED } from 'http-status-codes';
import LinkedRenderStore from 'link-lib';
import {
  LinkedResourceContainer,
  linkedPropType,
  register,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { LDLink } from '../../../components';
import { LoadingCoverPhoto } from '../../../components/Loading';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';

const propTypes = {
  linkedProp: linkedPropType,
};

const ClickableCover = ({ linkedProp }) => (
  <LDLink>
    <LinkedResourceContainer subject={linkedProp} />
  </LDLink>
);

ClickableCover.propTypes = propTypes;

const CoverPhotoOrLoading = ({ linkedProp }) => {
  useDataInvalidation({ subject: linkedProp });

  const lrs = useLRS();
  const status = lrs.getStatus(linkedProp);

  if (status.status === ACCEPTED || lrs.shouldLoadResource(linkedProp)) {
    return (
      <LinkedResourceContainer forceRender subject={linkedProp}>
        <LoadingCoverPhoto />
      </LinkedResourceContainer>
    );
  }

  return <LinkedResourceContainer subject={linkedProp} />;
};

CoverPhotoOrLoading.type = schema.Thing;

CoverPhotoOrLoading.property = NS.ontola('coverPhoto');

CoverPhotoOrLoading.topology = cardFixedTopology;

CoverPhotoOrLoading.propTypes = propTypes;

export default [
  register(CoverPhotoOrLoading),
  LinkedRenderStore.registerRenderer(
    ClickableCover,
    schema.Thing,
    NS.ontola('coverPhoto'),
    cardTopology
  ),
];
