import foaf from '@ontologies/foaf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import TableHeaderCell from '../../topologies/TableHeaderCell';
import { tableHeaderRowTopology } from '../../topologies/TableHeaderRow';

const propTypes = {
  name: linkType,
  onPageChange: PropTypes.func,
  sortOptions: PropTypes.arrayOf(linkType),
};

const SortableHeader = ({
  name,
  onPageChange,
  sortOptions,
}) => {
  const [current, clickHandler] = React.useMemo(() => {
    const currentOption = sortOptions.find((option) => option.selected);
    const currentIndex = sortOptions.indexOf(currentOption);
    const nextOption = sortOptions[((currentIndex + 1) % sortOptions.length)];

    const onClick = (e) => {
      e.preventDefault();
      onPageChange(nextOption.url);
    };

    return [currentOption, onClick];
  }, [sortOptions]);

  return (
    <button onClick={clickHandler}>
      {name.value} {current && <FontAwesome name={`sort-${current.direction}`} />}
    </button>
  );
};

SortableHeader.propTypes = propTypes;

const ThingTableHeaderRow = ({
  name,
  sortOptions,
  onPageChange,
}) => {
  const inner = name && sortOptions?.length > 0
    ? <SortableHeader name={name} sortOptions={sortOptions} onPageChange={onPageChange} />
    : name?.value;

  return (
    <TableHeaderCell>
      {inner}
    </TableHeaderCell>
  );
};

ThingTableHeaderRow.type = schema.Thing;

ThingTableHeaderRow.topology = tableHeaderRowTopology;

ThingTableHeaderRow.mapDataToProps = {
  name: {
    label: [schema.name, rdfs.label, foaf.name],
  },
};

ThingTableHeaderRow.propTypes = propTypes;

export default register(ThingTableHeaderRow);
