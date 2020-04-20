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
import ontola from '../../../ontology/ontola';
import { allTopologiesExcept } from '../../../topologies';
import { cardTopology } from '../../../topologies/Card';
import Container, { LargeContainer, containerTopology } from '../../../topologies/Container';
import { pageTopology } from '../../../topologies/Page';
import { CollectionTypes } from '../types';

const HeaderFloat = ({
  collectionDisplay,
  omniform,
  setCurrentPage,
  subject,
}) => (
  <React.Fragment>
    {!isTableDisplay(collectionDisplay) && (
      <React.Fragment>
        <Property label={ontola.sortOptions} setCurrentPage={setCurrentPage} />
      </React.Fragment>
    )}
    <CollectionCreateActionButton omniform={omniform} subject={subject} />
  </React.Fragment>
);
HeaderFloat.propTypes = {
  collectionDisplay: linkType,
  omniform: PropTypes.bool,
  setCurrentPage: PropTypes.func,
  subject: subjectType,
};

const cardCollectionHeader = (props) => {
  return (
    <CardHeader float={<HeaderFloat {...props} />}>
      <Property label={as.name} />
    </CardHeader>
  );
};
cardCollectionHeader.propTypes = {
  collectionDisplay: linkType,
  omniform: PropTypes.bool,
  setCurrentPage: PropTypes.func,
  subject: subjectType,
};

const containerCollectionHeader = (props) => {
  const {
    collectionDisplay,
    topology,
  } = props;
  let Wrapper = React.Fragment;
  if (collectionDisplay === ontola['collectionDisplay/default'] && topology !== containerTopology) {
    Wrapper = Container;
  }
  if (collectionDisplay === ontola['collectionDisplay/grid'] && topology !== containerTopology) {
    Wrapper = LargeContainer;
  }

  return (
    <Wrapper>
      <ContainerHeader float={<HeaderFloat {...props} />}>
        <Property label={as.name} />
      </ContainerHeader>
    </Wrapper>
  );
};
containerCollectionHeader.propTypes = {
  collectionDisplay: linkType,
  omniform: PropTypes.bool,
  setCurrentPage: PropTypes.func,
  subject: subjectType,
  topology: topologyType,
};

const registerHeader = buildRegister({
  property: ontola.header,
  type: CollectionTypes,
});

export default [
  registerHeader(cardCollectionHeader, { topology: cardTopology }),
  registerHeader(containerCollectionHeader, {
    topology: allTopologiesExcept(cardTopology, pageTopology),
  }),
];
