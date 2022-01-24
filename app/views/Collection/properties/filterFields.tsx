import * as as from '@ontologies/as';
import { SomeTerm } from '@ontologies/core';
import {
  FC,
  Resource,
  array,
  register,
  useIds,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { useIntl } from 'react-intl';

import TriggerButton, { Trigger } from '../../../components/DropdownMenu/TriggerButton';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import Menu from '../../../topologies/Menu';
import { collectionMessages } from '../../../translations/messages';

interface FilterFieldsProps {
  linkedProp: SomeTerm;
}

const trigger: Trigger = (props) => (
  <TriggerButton {...props}>
    <FontAwesome name="filter" />
  </TriggerButton>
);

const FilterFields: FC<FilterFieldsProps> = () => {
  const intl = useIntl();
  const filterFields = useIds(array(ontola.filterFields));

  const menuItems = React.useCallback(({ handleClose }) => filterFields
    .map((field) => (
      <Resource
        handleClose={handleClose}
        key={field?.value}
        subject={field}
      />
    )), [filterFields]);

  return (
    <Menu
      title={intl.formatMessage(collectionMessages.filter)}
      trigger={trigger}
    >
      {menuItems}
    </Menu>
  );
};

FilterFields.type = [
  ontola.SearchResult,
  ontola.Collection,
  as.Collection,
];

FilterFields.topology = allTopologies;

FilterFields.property = ontola.filterFields;

export default register(FilterFields);
