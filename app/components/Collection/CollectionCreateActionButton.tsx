import IconButton from '@material-ui/core/IconButton';
import { isNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  Property,
  Resource,
  ReturnType,
  useDataFetching,
  useDataInvalidation,
  useLRS,
  useProperty,
  useResourceLinks,
} from 'link-redux';
import React, { MouseEventHandler } from 'react';
import FontAwesome from 'react-fontawesome';

import { entityIsLoaded, sort } from '../../helpers/data';
import ontola from '../../ontology/ontola';
import Menu from '../../topologies/Menu';
import { LoadingCardFloat } from '../Loading';
import ResourceBoundary from '../ResourceBoundary';

import { useCollectionOptions } from './CollectionProvider';

const ORDER = [
  '/participants/add_all',
  '/participants/new',
];

const useFavoriteActions = (actions: SomeNode[], favorite: boolean) => {
  const favoriteStatuses = useResourceLinks(
    actions,
    { favoriteStatus: ontola.favoriteAction },
    { returnType: ReturnType.Literal },
  );

  return favoriteStatuses
    .filter(({ favoriteStatus }) => !!favoriteStatus === favorite)
    .map(({ subject }) => subject)
    .filter(isNode);
};

const useValidActions = (actions: SomeNode[]) => {
  const actionStatuses = useResourceLinks(actions, { status: schema.actionStatus });

  return actionStatuses
    .filter(({ status }) => status === schema.PotentialActionStatus)
    .map(({ subject }) => subject)
    .filter(isNode);
};

const trigger = (onClick: MouseEventHandler) => (
  <IconButton
    centerRipple
    color="default"
    size="small"
    onClick={onClick}
  >
    <FontAwesome name="plus" />
  </IconButton>
);

const CollectionCreateActionButton: React.FC = () => {
  const lrs = useLRS();
  const createActions = useProperty(ontola.createAction, { returnType: ReturnType.AllTerms }).filter(isNode);
  const validActions = useValidActions(createActions);
  const renderedActions = useFavoriteActions(validActions, false);
  useDataInvalidation(createActions);
  useDataFetching(createActions);

  const { omniform } = useCollectionOptions();

  if (createActions.length > 1) {
    const freshAction = createActions.find((action) => !entityIsLoaded(lrs, action));

    if (freshAction) {
      return <Resource subject={freshAction} onLoad={LoadingCardFloat} />;
    }

    if (renderedActions.length > 1) {
      return (
        <Menu trigger={trigger}>
          {() => (
            <ResourceBoundary>
              {renderedActions
                .sort(sort(ORDER))
                .map((action) => (
                  <Resource key={action?.value} subject={action} />
                ))}
            </ResourceBoundary>
          )}
        </Menu>
      );
    }
  }

  if (renderedActions.length === 0) {
    return null;
  }

  return (
    <Property
      label={ontola.createAction}
      omniform={omniform}
      onLoad={LoadingCardFloat}
    />
  );
};

export default CollectionCreateActionButton;
