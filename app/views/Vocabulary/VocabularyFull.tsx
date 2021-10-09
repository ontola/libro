import {
  Property,
  register,
  useIds,
  useNumbers,
  useValues,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { fullResourceTopology } from '../../topologies/FullResource';
import PageHeader from '../../topologies/PageHeader';

const VocabularyFull = () => {
  const [coverPhoto] = useIds(ontola.coverPhoto);
  const [coverPhotoUrl] = useValues(coverPhoto, ontola.imgUrl1500x2000);
  const [positionY] = useNumbers(coverPhoto, ontola.imagePositionY);

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

VocabularyFull.type = argu.Vocabulary;

VocabularyFull.topology = fullResourceTopology;

export default register(VocabularyFull);
