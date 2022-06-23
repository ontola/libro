import { SomeNode } from 'link-lib/dist-types/types';
import { Resource } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import Menu from '../../../topologies/Menu';
import { collectionMessages } from '../../../translations/messages';
import { sort } from '../../Common/lib/data';
import { Trigger } from '../../Menu/components/DropdownMenu/TriggerButton';

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
        <React.Fragment>
          {renderedActions
            .sort(sort(ORDER))
            .map((action) => (
              <Resource
                key={action?.value}
                subject={action}
              />
            ))}
        </React.Fragment>
      )}
    </Menu>
  );
};

export default CollectionCreateDropdown;
