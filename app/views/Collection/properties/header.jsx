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
import ontola from '../../../ontology/ontola';
import { allTopologiesExcept } from '../../../topologies';
import { cardTopology } from '../../../topologies/Card';
import Container, { LargeContainer, containerTopology } from '../../../topologies/Container';
import { pageTopology } from '../../../topologies/Page';
import { CollectionTypes } from '../types';

const HeaderFloat = ({
  hidePagination,
  omniform,
  setCurrentPage,
  subject,
}) => (
  <React.Fragment>
    {!hidePagination && <Property label={ontola.filterFields} setCurrentPage={setCurrentPage} />}
    {!hidePagination && <Property label={ontola.sortOptions} setCurrentPage={setCurrentPage} />}
    <CollectionCreateActionButton omniform={omniform} subject={subject} />
  </React.Fragment>
);
HeaderFloat.propTypes = {
  hidePagination: PropTypes.bool,
  omniform: PropTypes.bool,
  setCurrentPage: PropTypes.func,
  subject: subjectType,
};

const cardCollectionHeader = (props) => (
  <CardHeader float={<HeaderFloat {...props} />}>
    <Property label={as.name} />
    <div>
      <Property
        label={ontola.collectionFilter}
        limit={Infinity}
        setCurrentPage={props.setCurrentPage}
      />
    </div>
  </CardHeader>
);
cardCollectionHeader.propTypes = {
  collectionDisplay: linkType,
  omniform: PropTypes.bool,
  setCurrentPage: PropTypes.func,
  subject: subjectType,
};

const containerCollectionHeader = (props) => {
  const {
    collectionDisplay,
    setCurrentPage,
    topologyCtx,
  } = props;
  let Wrapper = React.Fragment;
  if (collectionDisplay === ontola['collectionDisplay/default'] && topologyCtx !== containerTopology) {
    Wrapper = Container;
  }
  if (collectionDisplay === ontola['collectionDisplay/grid'] && topologyCtx !== containerTopology) {
    Wrapper = LargeContainer;
  }

  return (
    <Wrapper>
      <ContainerHeader float={<HeaderFloat {...props} />}>
        <Property label={as.name} />
        <div>
          <Property
            label={ontola.collectionFilter}
            limit={Infinity}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </ContainerHeader>
    </Wrapper>
  );
};
containerCollectionHeader.propTypes = {
  collectionDisplay: linkType,
  omniform: PropTypes.bool,
  setCurrentPage: PropTypes.func,
  subject: subjectType,
  topologyCtx: topologyType,
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
