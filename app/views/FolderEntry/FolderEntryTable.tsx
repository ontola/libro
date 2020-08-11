import { NamedNode } from '@ontologies/core';
import schema from '@ontologies/schema';
import RDFTypes from '@rdfdev/prop-types';
import { FC, Property, register, Resource } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Spinner from '../../components/Spinner';
import dexes from '../../ontology/dexes';
import ontola from '../../ontology/ontola';
import { tableTopology } from '../../topologies/Table';
import TableRow from '../../topologies/TableRow';

interface Props {
  contains: NamedNode;
  columns?: Array<NamedNode | NamedNode[]> | Promise<any>;
}

const FolderEntryTable: FC<Props> = ({ columns, contains }) => {
  if (!Array.isArray(columns)) {
    return (
      <TableRow>
        <Spinner loading />
      </TableRow>
    );
  }

  // TODO: Remove hard-coding
  return (
    <TableRow>
      <Resource subject={contains}>
        <Property forceRender label={schema.name} />
      </Resource>
      <Property forceRender label={ontola.resource} />
    </TableRow>
  );
};

FolderEntryTable.type = dexes.FolderEntry;

FolderEntryTable.topology = tableTopology;

FolderEntryTable.mapDataToProps = {
  contains: ontola.contains,
};

FolderEntryTable.propTypes = {
  columns: PropTypes.oneOfType([
    PropTypes.instanceOf(Promise),
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        RDFTypes.namedNode,
        PropTypes.arrayOf(RDFTypes.namedNode),
      ]),
    ),
  ]),
};

export default register(FolderEntryTable);
