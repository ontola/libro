import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import Spinner from '../../components/Spinner';
import dexes from '../../ontology/dexes';
import ontola from '../../ontology/ontola';
import { tableTopology } from '../../topologies/Table';
import TableRow from '../../topologies/TableRow';

interface Props {
  contains: NamedNode;
  columns?: Array<NamedNode | NamedNode[]> | Promise<void>;
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

export default register(FolderEntryTable);
