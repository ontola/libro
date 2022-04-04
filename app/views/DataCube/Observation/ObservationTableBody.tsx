import { SomeTerm } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useLink,
} from 'link-redux';
import React from 'react';

import qb from '../../../ontology/qb';
import { tableBodyTopology } from '../../../topologies';
import TableCell from '../../../topologies/TableCell';
import TableRow from '../../../topologies/TableRow';

export interface ObservationTableBodyProps {
  measures: SomeNode[];
}

const ObservationTableBody: FC<ObservationTableBodyProps> = ({
  measures,
}) => {
  const propMap = measures.reduce((acc, propIRI, i) => ({
    [i]: propIRI,
    ...acc,
  }), {});
  const properties = useLink(propMap) as Record<string, SomeTerm>;

  return (
    <TableRow>
      {measures.map((_, i) => {
        const value = properties[i];

        if (!value) {
          return null;
        }

        return (
          <TableCell key={value?.value}>
            {value?.value}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

ObservationTableBody.type = qb.Observation;

ObservationTableBody.topology = tableBodyTopology;

export default register(ObservationTableBody);
