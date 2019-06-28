import { linkType, Property } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { CardHeader } from '../../../components';
import { buildRegister } from '../../../helpers/buildRegister';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologiesExcept } from '../../../topologies';
import { cardTopology } from '../../../topologies/Card';
import { containerTopology } from '../../../topologies/Container';
import ContainerHeader from '../../../components/Container/ContainerHeader';
import { CollectionTypes } from '../types';

const propTypes = {
  omniform: PropTypes.bool,
  pages: linkType,
};

const defaultCollectionHeader = () => (
  <React.Fragment>
    <Property label={NS.as('name')} />
  </React.Fragment>
);

const cardCollectionHeader = ({ omniform, pages }) => {
  const name = pages.length > 0 ? <Property label={NS.as('name')} /> : null;

  return (
    <CardHeader header={name}>
      <Property label={NS.ontola('createAction')} omniform={omniform} />
    </CardHeader>
  );
};
cardCollectionHeader.propTypes = propTypes;

const containerCollectionHeader = ({ omniform, pages }) => {
  const name = pages.length > 0 ? <Property label={NS.as('name')} /> : null;

  return (
    <ContainerHeader header={name}>
      <Property label={NS.ontola('createAction')} omniform={omniform} />
    </ContainerHeader>
  );
};
containerCollectionHeader.propTypes = propTypes;

const registerHeader = buildRegister({
  mapDataToProps: {
    pages: {
      label: NS.as('pages'),
      limit: Infinity,
    },
  },
  property: NS.ontola('header'),
  type: CollectionTypes,
});

export default [
  registerHeader(cardCollectionHeader, { topology: cardTopology }),
  registerHeader(containerCollectionHeader, { topology: containerTopology }),
  registerHeader(defaultCollectionHeader, {
    mapDataToProps: null,
    topology: allTopologiesExcept(cardTopology, containerTopology),
  }),
];
