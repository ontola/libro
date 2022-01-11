import { SomeNode } from 'link-lib/dist-types/types';
import { Resource } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import { sort } from '../../helpers/data';
import Menu from '../../topologies/Menu';
import { collectionMessages } from '../../translations/messages';
import { Trigger } from '../DropdownMenu/TriggerButton';

const ORDER = [
  '/participants/add_all',
  '/participants/new',
];

interface CollectionCreateDropdownProps {
  triggerComponent: Trigger;
  renderedActions: SomeNode[];
}

const CollectionCreateDropdown = ({
  triggerComponent: TriggerComponent,
  renderedActions,
}: CollectionCreateDropdownProps): JSX.Element | null => {
  const intl = useIntl();

  return (
    <Menu
      title={intl.formatMessage(collectionMessages.add)}
      trigger={TriggerComponent}
    >
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
};

export default CollectionCreateDropdown;
