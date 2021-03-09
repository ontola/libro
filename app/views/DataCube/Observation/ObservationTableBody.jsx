import {
  linkType,
  useLink,
  withLRS,
} from 'link-redux';
import React from 'react';

import qb from '../../../ontology/qb';
import { tableBodyTopology } from '../../../topologies/TableBody';
import TableCell from '../../../topologies/TableCell';
import TableRow from '../../../topologies/TableRow';

const ObservationTableBody = ({
  measures,
}) => {
  const propMap = measures.reduce((acc, propIRI, i) => ({
    [i]: propIRI,
    ...acc,
  }), {});
  const properties = useLink(propMap);

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

ObservationTableBody.hocs = [withLRS];

ObservationTableBody.propTypes = {
  measures: linkType,
};

export default ObservationTableBody;
