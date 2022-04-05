import rdf, { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React, { MouseEvent } from 'react';
import FontAwesome from 'react-fontawesome';

import { useCollectionOptions } from '../../components/Collection/CollectionContext';
import { SortProps } from '../../hooks/useSorting';
import { titleProps } from '../../ontology/app';
import { tableHeaderRowTopology } from '../../topologies';
import TableHeaderCell from '../../topologies/TableHeaderCell';

interface ThingTableHeaderRowProps {
  name: SomeTerm;
  sortOptions: SortProps[]
}

const SortableHeader = ({
  name,
  sortOptions,
}: ThingTableHeaderRowProps): JSX.Element => {
  const { setCollectionResource } = useCollectionOptions();
  const [current, clickHandler] = React.useMemo(() => {
    const currentOption = sortOptions.find((option) => option.selected);
    const currentIndex = currentOption ? sortOptions.indexOf(currentOption) : -1;
    const nextOption = sortOptions[((currentIndex + 1) % sortOptions.length)];

    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      setCollectionResource(rdf.namedNode(nextOption.url));
    };

    return [currentOption, onClick];
  }, [sortOptions, setCollectionResource]);

  return (
    <button
      type="button"
      onClick={clickHandler}
    >
      {name.value}
      {' '}
      {current && <FontAwesome name={`sort-${current.direction}`} />}
    </button>
  );
};

const ThingTableHeaderRow: FC<ThingTableHeaderRowProps> = ({ sortOptions }) => {
  const [name] = useProperty(titleProps);

  const inner = name && sortOptions?.length > 0
    ? (
      <SortableHeader
        name={name}
        sortOptions={sortOptions}
      />
    )
    : name?.value;

  return (
    <TableHeaderCell>
      {inner}
    </TableHeaderCell>
  );
};

ThingTableHeaderRow.type = schema.Thing;

ThingTableHeaderRow.topology = tableHeaderRowTopology;

export default register(ThingTableHeaderRow);
