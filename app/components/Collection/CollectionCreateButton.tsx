import {
  Resource,
  useDataFetching,
  useDataInvalidation,
  useIds,
  useLRS,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import { entityIsLoaded, sort } from '../../helpers/data';
import { useShowDialog } from '../../hooks/useShowDialog';
import ontola from '../../ontology/ontola';
import Menu from '../../topologies/Menu';
import { formMessages } from '../../translations/messages';
import Button from '../Button';
import TriggerButton, { Trigger } from '../DropdownMenu/TriggerButton';

import { useFavoriteActions } from './lib/useFavoriteActions';
import { useValidActions } from './lib/useValidActions';

const ORDER = [
  '/participants/add_all',
  '/participants/new',
];

export enum TriggerType {
  Icon = 'icon',
  Text = 'text',
}

interface CollectionCreateButtonProps {
  trigger?: TriggerType;
}

const IconTrigger: Trigger = (props) => (
  <TriggerButton {...props}>
    <FontAwesome name="plus" />
  </TriggerButton>
);

const TextTrigger: Trigger = ({
  onClick,
  anchorRef,
}) => (
  <Button
    plain
    ref={anchorRef}
    onClick={onClick}
  >
    <FormattedMessage {...formMessages.newTrigger} />
  </Button>
);

const getTrigger = (type?: TriggerType) => {
  switch (type) {
  case TriggerType.Text:
    return TextTrigger;
  default:
    return IconTrigger;
  }
};

const CollectionCreateButton: React.FC<CollectionCreateButtonProps> = ({
  trigger,
}) => {
  const lrs = useLRS();
  const createActions = useIds(ontola.createAction);
  const validActions = useValidActions(createActions);
  const renderedActions = useFavoriteActions(validActions, false);
  useDataInvalidation(createActions);
  useDataFetching(createActions);
  const showDialog = useShowDialog(createActions[0]?.value);

  const TriggerComponent = getTrigger(trigger);

  if (createActions.length > 1) {
    const freshAction = createActions.find((action) => !entityIsLoaded(lrs, action));

    if (freshAction) {
      return (
        <Resource subject={freshAction} />
      );
    }

    if (renderedActions.length > 1) {
      return (
        <Menu trigger={TriggerComponent}>
          {() => (
            renderedActions
              .sort(sort(ORDER))
              .map((action) => (
                <Resource
                  key={action?.value}
                  subject={action}
                />
              )))}
        </Menu>
      );
    }
  }

  if (renderedActions.length === 0) {
    return null;
  }

  return (
    <TriggerComponent onClick={showDialog} />
  );
};

CollectionCreateButton.defaultProps = {
  trigger: TriggerType.Icon,
};

export default CollectionCreateButton;
