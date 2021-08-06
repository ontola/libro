import { SomeTerm } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  ReturnType,
  register,
  useResourceLink,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { fullResourceTopology } from '../../topologies/FullResource';
import PageHeader from '../../topologies/PageHeader';

export interface VocabularyFullProps {
  coverPhoto: SomeTerm;
}

const coverPhotoMap = {
  coverPhotoUrl: ontola.imgUrl1500x2000,
  positionY: ontola.imagePositionY,
};

const coverPhotoOpts = { returnType: ReturnType.Value };

const VocabularyFull: FC<VocabularyFullProps> = ({ coverPhoto }) => {
  const { coverPhotoUrl, positionY } = useResourceLink(coverPhoto as SomeNode, coverPhotoMap, coverPhotoOpts);

  return (
    <React.Fragment>
      <PageHeader
        background={coverPhotoUrl}
        positionY={positionY}
      />
      <Property label={argu.terms} />
    </React.Fragment>
  );
};

VocabularyFull.mapDataToProps = {
  coverPhoto: ontola.coverPhoto,
};

VocabularyFull.type = argu.Vocabulary;

VocabularyFull.topology = fullResourceTopology;

export default register(VocabularyFull);
