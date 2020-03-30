import as from '@ontologies/as';
import {
  Property,
  ReturnType,
  linkType,
  subjectType,
  topologyType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import CardHeader from '../../../components/Card/CardHeader';
import CollectionCreateActionButton from '../../../components/Collection/CollectionCreateActionButton';
import ContainerHeader from '../../../components/Container/ContainerHeader';
import { buildRegister } from '../../../helpers/buildRegister';
import ontola from '../../../ontology/ontola';
import { allTopologiesExcept } from '../../../topologies';
import { cardTopology } from '../../../topologies/Card';
import Container, { LargeContainer, containerTopology } from '../../../topologies/Container';
import { pageTopology } from '../../../topologies/Page';
import { CollectionTypes } from '../types';

const cardCollectionHeader = ({
  omniform,
  onPageChange,
  pages,
  subject,
}) => {
  const name = pages.length > 0 ? <Property label={as.name} /> : null;

  return (
    <CardHeader header={name}>
      <Property label={ontola.sortOptions} onPageChange={onPageChange} />
      <CollectionCreateActionButton omniform={omniform} subject={subject} />
    </CardHeader>
  );
};
cardCollectionHeader.propTypes = {
  omniform: PropTypes.bool,
  onPageChange: PropTypes.func,
  pages: linkType,
  subject: subjectType,
};

const containerCollectionHeader = ({
  collectionDisplay,
  omniform,
  onPageChange,
  pages,
  subject,
  topology,
}) => {
  const name = pages.length > 0 ? <Property label={as.name} /> : null;
  let Wrapper = React.Fragment;
  if (collectionDisplay === ontola['collectionDisplay/default'] && topology !== containerTopology) {
    Wrapper = Container;
  }
  if (collectionDisplay === ontola['collectionDisplay/grid'] && topology !== containerTopology) {
    Wrapper = LargeContainer;
  }

  return (
    <Wrapper>
      <ContainerHeader header={name}>
        <Property label={ontola.sortOptions} onPageChange={onPageChange} />
        <CollectionCreateActionButton omniform={omniform} subject={subject} />
      </ContainerHeader>
    </Wrapper>
  );
};
containerCollectionHeader.propTypes = {
  collectionDisplay: linkType,
  omniform: PropTypes.bool,
  onPageChange: PropTypes.func,
  pages: linkType,
  subject: subjectType,
  topology: topologyType,
};

const registerHeader = buildRegister({
  mapDataToProps: {
    pages: {
      label: ontola.pages,
      returnType: ReturnType.AllTerms,
    },
  },
  property: ontola.header,
  type: CollectionTypes,
});

export default [
  registerHeader(cardCollectionHeader, { topology: cardTopology }),
  registerHeader(containerCollectionHeader, {
    topology: allTopologiesExcept(cardTopology, pageTopology),
  }),
];
