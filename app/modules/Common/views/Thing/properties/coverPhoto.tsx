import makeStyles from '@mui/styles/makeStyles';
import { NamedNode, isLiteral } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { ACCEPTED } from 'http-status-codes';
import {
  PropertyProps,
  Resource,
  register,
  useDataInvalidation,
  useFields,
  useLRS,
} from 'link-redux';
import React from 'react';

import { LoadingCoverPhoto } from '../../../components/Loading';
import ontola from '../../../../Kernel/ontology/ontola';
import CoverImage from '../../../components/CoverImage';
import LDLink from '../../../components/LDLink';
import { tryParseInt } from '../../../lib/numbers';
import {
  cardFixedTopology,
  cardMainTopology,
  cardTopology,
  mainBodyTopology,
  pageTopology,
} from '../../../topologies';

const useStyles = makeStyles({
  coverImageLink: {
    '&:hover': {
      filter: 'brightness(0.9)',
    },
    transition: 'filter 100ms ease',
  },
});

const registerCoverPhoto = (
  prop: NamedNode,
  topology: NamedNode[],
  linked = false,
) => {
  const CoverPhotoOrLoading = ({
    linkedProp,
  }: PropertyProps) => {
    if (isLiteral(linkedProp)) {
      throw new Error(`coverPhoto was a Literal (${linkedProp.value})`);
    }

    const lrs = useLRS();
    const classes = useStyles();
    useDataInvalidation(linkedProp);
    const [imagePositionY] = useFields(linkedProp, ontola.imagePositionY);
    const [url] = useFields(linkedProp, prop);
    const status = lrs.getStatus(linkedProp);

    if (status.status === ACCEPTED || lrs.shouldLoadResource(linkedProp)) {
      return (
        <Resource
          forceRender
          subject={linkedProp}
        >
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
          positionY={tryParseInt(imagePositionY)!}
          url={url.value}
        />
      </Wrapper>
    );
  };

  CoverPhotoOrLoading.type = schema.Thing;

  CoverPhotoOrLoading.property = ontola.coverPhoto;

  CoverPhotoOrLoading.topology = topology;

  return register(CoverPhotoOrLoading);
};

export default [
  ...registerCoverPhoto(ontola.imgUrl1500x2000, [pageTopology]),
  ...registerCoverPhoto(ontola.imgUrl568x400, [cardFixedTopology, mainBodyTopology]),
  ...registerCoverPhoto(ontola.imgUrl568x400, [
    cardTopology,
    cardMainTopology,
  ], true),
];
