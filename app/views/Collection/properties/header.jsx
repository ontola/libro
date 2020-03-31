import as from '@ontologies/as';
import {
  Property,
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
import { isTableDisplay } from '../../../helpers/collections';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { allTopologiesExcept } from '../../../topologies';
import { cardTopology } from '../../../topologies/Card';
import Container, { LargeContainer, containerTopology } from '../../../topologies/Container';
import { pageTopology } from '../../../topologies/Page';
import { CollectionTypes } from '../types';

const cardCollectionHeader = ({
  collectionDisplay,
  omniform,
  onPageChange,
  subject,
}) => {
  const name = <Property label={as.name} />;

  return (
    <CardHeader header={name}>
      {!isTableDisplay(collectionDisplay) && (
        <Property label={ontola.sortOptions} onPageChange={onPageChange} />
      )}
      <CollectionCreateActionButton omniform={omniform} subject={subject} />
    </CardHeader>
  );
};
cardCollectionHeader.propTypes = {
  collectionDisplay: linkType,
  omniform: PropTypes.bool,
  onPageChange: PropTypes.func,
  subject: subjectType,
};

const containerCollectionHeader = ({
  collectionDisplay,
  omniform,
  onPageChange,
  subject,
  topology,
}) => {
  const name = <Property label={as.name} />;
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
        {!isTableDisplay(collectionDisplay) && (
          <Property label={ontola.sortOptions} onPageChange={onPageChange} />
        )}
        <CollectionCreateActionButton omniform={omniform} subject={subject} />
      </ContainerHeader>
    </Wrapper>
  );
};
containerCollectionHeader.propTypes = {
  collectionDisplay: linkType,
  omniform: PropTypes.bool,
  onPageChange: PropTypes.func,
  subject: subjectType,
  topology: topologyType,
};

const registerHeader = buildRegister({
  property: ontola.header,
  type: [...CollectionTypes, argu.SearchResult],
});

export default [
  registerHeader(cardCollectionHeader, { topology: cardTopology }),
  registerHeader(containerCollectionHeader, {
    topology: allTopologiesExcept(cardTopology, pageTopology),
  }),
];
