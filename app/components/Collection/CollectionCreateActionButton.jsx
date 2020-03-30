import IconButton from '@material-ui/core/IconButton';
import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  ReturnType,
  subjectType,
  useDataFetching,
  useDataInvalidation,
  useLRS,
  useProperty,
  useResourceLinks,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { entityIsLoaded, sort } from '../../helpers/data';
import ontola from '../../ontology/ontola';
import Menu from '../../topologies/Menu';
import { LoadingCardFloat } from '../Loading';
import ResourceBoundary from '../ResourceBoundary';

const ORDER = [
  '/participants/add_all',
  '/participants/new',
];

const useValidActions = (actions) => {
  const actionStatuses = useResourceLinks(actions, { status: schema.actionStatus });

  return actionStatuses
    .filter(({ status }) => status === schema.PotentialActionStatus)
    .map(({ subject }) => subject);
};

const CollectionCreateActionButton = ({
  omniform,
  subject,
}) => {
  const lrs = useLRS();
  const createActions = useProperty(ontola.createAction, { returnType: ReturnType.AllTerms });
  const validActions = useValidActions(createActions);
  useDataInvalidation([...createActions, subject]);
  useDataFetching(createActions);

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
      return <Resource subject={freshAction} onLoad={LoadingCardFloat} />;
    }

    if (validActions.length === 0) {
      return null;
    }

    if (validActions.length > 1) {
      return (
        <Menu lazy trigger={trigger}>
          {() => (
            <ResourceBoundary>
              {validActions
                .sort(sort(ORDER))
                .map((action) => (
                  <Resource key={action} subject={action} />
                ))}
            </ResourceBoundary>
          )}
        </Menu>
      );
    }
  }

  return (
    <Property
      label={ontola.createAction}
      omniform={omniform}
      onLoad={LoadingCardFloat}
    />
  );
};

CollectionCreateActionButton.propTypes = {
  omniform: PropTypes.bool,
  subject: subjectType,
};

export default CollectionCreateActionButton;
