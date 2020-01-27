import schema from '@ontologies/schema';
import { ACCEPTED } from 'http-status-codes';
import {
  Resource,
  linkedPropType,
  register,
  useDataInvalidation,
  useLRS,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import { CoverImage } from '../../../components';
import { LoadingCoverPhoto } from '../../../components/Loading';
import ontola from '../../../ontology/ontola';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { tryParseInt } from '../../../helpers/numbers';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { pageTopology } from '../../../topologies/Page';

const registerCoverPhoto = (prop, topology) => {
  const CoverPhotoOrLoading = ({
    linkedProp,
  }) => {
    const lrs = useLRS();
    useDataInvalidation({ subject: linkedProp });
    const [imagePositionY] = useResourceProperty(linkedProp, ontola.imagePositionY);
    const [url] = useResourceProperty(linkedProp, prop);
    const status = lrs.getStatus(linkedProp);

    if (status.status === ACCEPTED || lrs.shouldLoadResource(linkedProp)) {
      return (
        <Resource forceRender subject={linkedProp}>
          <LoadingCoverPhoto />
        </Resource>
      );
    }

    if (!url) {
      return null;
    }

    return (
      <CoverImage
        positionY={tryParseInt(imagePositionY)}
        url={url.value}
      />
    );
  };

  CoverPhotoOrLoading.type = schema.Thing;

  CoverPhotoOrLoading.property = ontola.coverPhoto;

  CoverPhotoOrLoading.topology = topology;

  CoverPhotoOrLoading.propTypes = {
    linkedProp: linkedPropType,
  };

  return register(CoverPhotoOrLoading);
};

export default [
  registerCoverPhoto(ontola.imgUrl1500x2000, [pageTopology]),
  registerCoverPhoto(ontola.imgUrl568x400, [
    cardTopology,
    cardFixedTopology,
    cardMainTopology,
  ]),
];
