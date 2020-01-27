import as from '@ontologies/as';
import schema from '@ontologies/schema';
import IconButton from '@material-ui/core/IconButton';
import {
  Property,
  Resource,
  linkType,
  lrsType,
  subjectType,
  topologyType,
  useDataInvalidation,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import {
  CardHeader,
  ResourceBoundary,
} from '../../../components';
import ContainerHeader from '../../../components/Container/ContainerHeader';
import { entityIsLoaded, sort } from '../../../helpers/data';
import { buildRegister } from '../../../helpers/buildRegister';
import ontola from '../../../ontology/ontola';
import { allTopologiesExcept } from '../../../topologies';
import { cardTopology } from '../../../topologies/Card';
import Container, { LargeContainer, containerTopology } from '../../../topologies/Container';
import Menu from '../../../topologies/Menu';
import { pageTopology } from '../../../topologies/Page';
import { CollectionTypes } from '../types';

const ORDER = [
  '/participants/add_all',
  '/participants/new',
];

const actionIsValid = (lrs, action) => {
  const status = lrs.getResourceProperty(action, schema.actionStatus);

  return status === schema.PotentialActionStatus;
};

const CreateActionButton = ({
  lrs,
  omniform,
  subject,
}) => {
  const createActions = lrs.getResourceProperties(subject, ontola.createAction);
  useDataInvalidation({
    dataSubjects: createActions,
    subject,
  });
  if (__CLIENT__) {
    createActions.forEach((action) => {
      if (!entityIsLoaded(lrs, action)) {
        lrs.queueEntity(action);
      }
    });
  }

  const trigger = (onClick) => (
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
    const freshAction = createActions.find((action) => !entityIsLoaded(lrs, action));
    if (freshAction) {
      return <Resource subject={freshAction} />;
    }

    const validActions = createActions.filter((action) => actionIsValid(lrs, action));
    if (validActions.length === 0) {
      return null;
    }

    if (validActions.length > 1) {
      return (
        <Menu
          lazy
          trigger={trigger}
        >
          {() => (
            <ResourceBoundary>
              {
                validActions.sort(sort(ORDER))
                  .map((action) => (
                    <Resource subject={action} />
                  ))
              }
            </ResourceBoundary>
          )}
        </Menu>
      );
    }
  }

  return <Property label={ontola.createAction} omniform={omniform} />;
};
CreateActionButton.propTypes = {
  lrs: lrsType,
  omniform: PropTypes.bool,
  subject: subjectType,
};

const cardCollectionHeader = ({
  lrs,
  omniform,
  pages,
  subject,
}) => {
  const name = pages.length > 0 ? <Property label={as.name} /> : null;

  return (
    <CardHeader header={name}>
      <CreateActionButton lrs={lrs} omniform={omniform} subject={subject} />
    </CardHeader>
  );
};
cardCollectionHeader.propTypes = {
  lrs: lrsType,
  omniform: PropTypes.bool,
  pages: linkType,
  subject: subjectType,
};

const containerCollectionHeader = ({
  collectionDisplay,
  lrs,
  omniform,
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
        <CreateActionButton lrs={lrs} omniform={omniform} subject={subject} />
      </ContainerHeader>
    </Wrapper>
  );
};
containerCollectionHeader.propTypes = {
  collectionDisplay: linkType,
  lrs: lrsType,
  omniform: PropTypes.bool,
  pages: linkType,
  subject: subjectType,
  topology: topologyType,
};

const registerHeader = buildRegister({
  mapDataToProps: {
    pages: {
      label: ontola.pages,
      limit: Infinity,
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
