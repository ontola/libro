import * as schema from '@ontologies/schema';
import {
  Resource,
  dig,
  useGlobalIds,
  useIds,
  useLRS,
  useStrings,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage, useIntl } from 'react-intl';

import ontola from '../../../ontology/ontola';
import { collectionMessages, formMessages } from '../../../translations/messages';
import { useEnabledActions } from '../../Action/hooks/useEnabledActions';
import Button from '../../Common/components/Button';
import HeaderButton from '../../Common/components/Button/HeaderButton';
import { useShowDialog } from '../../Common/hooks/useShowDialog';
import { entityIsLoaded } from '../../Core/lib/data';
import { normalizeFontAwesomeIRI } from '../../Common/lib/iris';
import TriggerButton, { Trigger } from '../../Menu/components/DropdownMenu/TriggerButton';
import { useFavoriteActions } from '../hooks/useFavoriteActions';

import CollectionCreateDropdown from './CollectionCreateDropdown';

export enum TriggerType {
  TextWithIcon = 'TextWithIcon',
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

const TextWithIconTrigger: Trigger = ({
  onClick,
  title,
}) => {
  const [image] = useIds(dig(ontola.createAction, schema.target, schema.image));
  const icon = (image ? normalizeFontAwesomeIRI(image) : undefined) ?? 'plus';

  return (
    <HeaderButton
      icon={icon}
      title={title}
      onClick={onClick}
    />
  );
};

const getTrigger = (type?: TriggerType) => {
  switch (type) {
  case TriggerType.Text:
    return TextTrigger;
  case TriggerType.TextWithIcon:
    return TextWithIconTrigger;
  default:
    return IconTrigger;
  }
};

const CollectionCreateButton: React.FC<CollectionCreateButtonProps> = ({
  trigger,
}) => {
  const lrs = useLRS();
  const intl = useIntl();
  const createActions = useGlobalIds(ontola.createAction);
  const [actionDialog] = useIds(ontola.actionDialog);
  const validActions = useEnabledActions(createActions);
  const renderedActions = useFavoriteActions(validActions, false);
  const [actionName] = useStrings(renderedActions[0], schema.name);
  const showDialog = useShowDialog(actionDialog ?? renderedActions[0]);
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
      title={actionDialog ? intl.formatMessage(collectionMessages.add) : actionName}
      onClick={showDialog}
    />
  );
};

CollectionCreateButton.defaultProps = {
  trigger: TriggerType.Icon,
};

export default CollectionCreateButton;
