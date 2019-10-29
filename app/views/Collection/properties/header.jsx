import IconButton from '@material-ui/core/IconButton';
import {
  LinkedResourceContainer,
  Property,
  linkType,
  lrsType,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import {
  CardHeader,
  Resource,
} from '../../../components';
import { buildRegister } from '../../../helpers/buildRegister';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologiesExcept } from '../../../topologies';
import { cardTopology } from '../../../topologies/Card';
import ContainerHeader from '../../../components/Container/ContainerHeader';
import { CollectionTypes } from '../types';
import { sort } from '../../../helpers/data';
import Menu from '../../../topologies/Menu';

const ORDER = [
  '/participants/add_all',
  '/participants/new',
];

const CreateActionButton = ({
  lrs,
  omniform,
  subject,
}) => {
  const createActions = lrs.getResourceProperties(subject, NS.ontola('createAction'));
  const trigger = onClick => (
    <IconButton
      centerRipple
      color="default"
      size="small"
      onClick={onClick}
    >
      <FontAwesome name="plus" />
    </IconButton>
  );

  if (createActions.length > 1) {
    return (
      <Menu
        lazy
        trigger={trigger}
      >
        {() => (
          <Resource>
            {
              createActions.sort(sort(ORDER)).map(action => (
                <LinkedResourceContainer subject={action} />
              ))
            }
          </Resource>
        )}
      </Menu>
    );
  }

  return <Property label={NS.ontola('createAction')} omniform={omniform} />;
};
CreateActionButton.propTypes = {
  lrs: lrsType,
  omniform: PropTypes.bool,
  subject: subjectType,
};

const propTypes = {
  lrs: lrsType,
  omniform: PropTypes.bool,
  pages: linkType,
  subject: subjectType,
};

const cardCollectionHeader = ({
  lrs,
  omniform,
  pages,
  subject,
}) => {
  const name = pages.length > 0 ? <Property label={NS.as('name')} /> : null;

  return (
    <CardHeader header={name}>
      <CreateActionButton lrs={lrs} omniform={omniform} subject={subject} />
    </CardHeader>
  );
};
cardCollectionHeader.propTypes = propTypes;

const containerCollectionHeader = ({
  lrs,
  omniform,
  pages,
  subject,
}) => {
  const name = pages.length > 0 ? <Property label={NS.as('name')} /> : null;

  return (
    <ContainerHeader header={name}>
      <CreateActionButton lrs={lrs} omniform={omniform} subject={subject} />
    </ContainerHeader>
  );
};
containerCollectionHeader.propTypes = propTypes;

const registerHeader = buildRegister({
  mapDataToProps: {
    pages: {
      label: NS.ontola('pages'),
      limit: Infinity,
    },
  },
  property: NS.ontola('header'),
  type: CollectionTypes,
});

export default [
  registerHeader(cardCollectionHeader, { topology: cardTopology }),
  registerHeader(containerCollectionHeader, { topology: allTopologiesExcept(cardTopology) }),
];
