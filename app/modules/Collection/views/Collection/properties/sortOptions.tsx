import rdf, { SomeTerm } from '@ontologies/core';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React, { MouseEventHandler } from 'react';
import FontAwesome from 'react-fontawesome';
import { useIntl } from 'react-intl';

import { allTopologies } from '../../../../../topologies';
import { collectionMessages } from '../../../../../translations/messages';
import { retrievePath } from '../../../../Common/lib/iris';
import ontola from '../../../../Core/ontology/ontola';
import { RenderProp } from '../../../../Menu/components/DropdownMenu/DropdownMenu';
import TriggerButton, { Trigger } from '../../../../Menu/components/DropdownMenu/TriggerButton';
import MenuItem from '../../../../Menu/components/MenuItem';
import Menu from '../../../../Menu/topologies/Menu';
import { useCollectionOptions } from '../../../components/CollectionContext';
import { SortProps, useSorting } from '../../../hooks/useSorting';
import { CollectionTypes } from '../types';

export interface SortOptionsProps {
  linkedProp: SomeTerm;
}

type SortOptionProps = SortProps & MenuItemsProps;

interface MenuItemsProps {
  handleClose: () => void;
}

const trigger: Trigger = (props) => (
  <TriggerButton {...props}>
    <FontAwesome name="sort" />
  </TriggerButton>
);

const SortOption = ({
  handleClose,
  item,
  url,
  direction,
  selected,
}: SortOptionProps) => {
  const { setCollectionResource } = useCollectionOptions();
  const action = React.useCallback<MouseEventHandler>((e) => {
    e.preventDefault();
    handleClose();
    setCollectionResource(rdf.namedNode(url));
  }, [handleClose, setCollectionResource, url]);

  return (
    <MenuItem
      action={action}
      expandOpen={null}
      url={retrievePath(url!)!}
    >
      <FontAwesome name={selected ? 'circle' : 'circle-o'} />
      {' '}
      <FontAwesome name={`sort-amount-${direction}`} />
      {' '}
      <Resource subject={item} />
    </MenuItem>
  );
};

const SortOptions: FC<SortOptionsProps> = () => {
  const intl = useIntl();
  const { currentCollection } = useCollectionOptions();
  const sortOptions = useSorting(currentCollection);

  const menuItems = React.useCallback<RenderProp>(({ handleClose }) => (
    <React.Fragment>
      {sortOptions.filter((option) => option.direction && option.url).map((option) => (
        <SortOption
          {...option}
          handleClose={handleClose}
          key={option.url}
        />
      ))}
    </React.Fragment>
  ), [sortOptions]);

  return (
    <Menu
      title={intl.formatMessage(collectionMessages.sort)}
      trigger={trigger}
    >
      {menuItems}
    </Menu>
  );
};

SortOptions.type = CollectionTypes;

SortOptions.topology = allTopologies;

SortOptions.property = ontola.sortOptions;

export default register(SortOptions);
