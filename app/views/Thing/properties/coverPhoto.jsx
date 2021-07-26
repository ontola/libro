import { makeStyles } from '@material-ui/core/styles';
import * as schema from '@ontologies/schema';
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

import CoverImage from '../../../components/CoverImage';
import LDLink from '../../../components/LDLink';
import { LoadingCoverPhoto } from '../../../components/Loading';
import { tryParseInt } from '../../../helpers/numbers';
import ontola from '../../../ontology/ontola';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { pageTopology } from '../../../topologies/Page';

const useStyles = makeStyles({
  coverImageLink: {
    '&:hover': {
      filter: 'brightness(0.9)',
    },
    transition: 'filter 100ms ease',
  },
});

const registerCoverPhoto = (prop, topology, linked = false) => {
  const CoverPhotoOrLoading = ({
    linkedProp,
  }) => {
    const lrs = useLRS();
    const classes = useStyles();
    useDataInvalidation(linkedProp);
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

    const Wrapper = linked ? LDLink : React.Fragment;
    const wrapperProps = linked ? { className: classes.coverImageLink } : {};

    return (
      <Wrapper {...wrapperProps}>
        <CoverImage
          positionY={tryParseInt(imagePositionY)}
          url={url.value}
        />
      </Wrapper>
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
  ], true),
];
