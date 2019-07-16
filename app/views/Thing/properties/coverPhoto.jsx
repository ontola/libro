import { ACCEPTED } from 'http-status-codes';
import LinkedRenderStore from 'link-lib';
import {
  linkedPropType,
  LinkedResourceContainer,
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

CoverPhotoOrLoading.type = NS.schema('Thing');

CoverPhotoOrLoading.property = NS.argu('coverPhoto');

CoverPhotoOrLoading.topology = cardFixedTopology;

CoverPhotoOrLoading.propTypes = propTypes;

export default [
  register(CoverPhotoOrLoading),
  LinkedRenderStore.registerRenderer(
    ClickableCover,
    NS.schema('Thing'),
    NS.argu('coverPhoto'),
    cardTopology
  ),
];
