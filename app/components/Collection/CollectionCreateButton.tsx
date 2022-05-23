import * as schema from '@ontologies/schema';
import {
  Resource,
  dig,
  useDataFetching,
  useDataInvalidation,
  useIds,
  useLRS,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage, useIntl } from 'react-intl';

import { entityIsLoaded } from '../../helpers/data';
import { normalizeFontAwesomeIRI } from '../../helpers/iris';
import { useShowDialog } from '../../hooks/useShowDialog';
import ontola from '../../ontology/ontola';
import { collectionMessages, formMessages } from '../../translations/messages';
import Button from '../Button';
import TriggerButton, { Trigger } from '../DropdownMenu/TriggerButton';

import CollectionCreateDropdown from './CollectionCreateDropdown';
import { useFavoriteActions } from './lib/useFavoriteActions';
import { useValidActions } from './lib/useValidActions';

export enum TriggerType {
  Icon = 'icon',
  Text = 'text',
}

interface CollectionCreateButtonProps {
  trigger?: TriggerType;
}

const IconTrigger: Trigger = (props) => {
  const [image] = useIds(dig(ontola.createAction, schema.target, schema.image));
  const icon = (image ? normalizeFontAwesomeIRI(image) : undefined) ?? 'plus';

  return (
    <TriggerButton {...props}>
      <FontAwesome name={icon} />
    </TriggerButton>
  );
};

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
  const intl = useIntl();
  const createActions = useIds(ontola.createAction);
  const [actionDialog] = useIds(ontola.actionDialog);
  const validActions = useValidActions(createActions);
  const renderedActions = useFavoriteActions(validActions, false);
  useDataInvalidation(createActions);
  useDataFetching(createActions);
  const showDialog = useShowDialog(actionDialog?.value ?? renderedActions[0]?.value);
  const TriggerComponent = getTrigger(trigger);

  const freshAction = createActions.find((action) => !entityIsLoaded(lrs, action));

  if (freshAction) {
    return (
      <Resource subject={freshAction} />
    );
  }

  if (renderedActions.length == 0) {
    return null;
  }

  if (renderedActions.length > 1 && !actionDialog) {
    return (
      <CollectionCreateDropdown
        renderedActions={renderedActions}
        triggerComponent={TriggerComponent}
      />
    );
  }

  return (
    <TriggerComponent
      title={intl.formatMessage(collectionMessages.add)}
      onClick={showDialog}
    />
  );
};

CollectionCreateButton.defaultProps = {
  trigger: TriggerType.Icon,
};

export default CollectionCreateButton;
