import { makeStyles } from '@material-ui/core/styles';
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
  registerCoverPhoto(ontola.imgUrl1500x2000, [pageTopology]),
  registerCoverPhoto(ontola.imgUrl568x400, [cardFixedTopology]),
  registerCoverPhoto(ontola.imgUrl568x400, [
    cardTopology,
    cardMainTopology,
  ], true),
];