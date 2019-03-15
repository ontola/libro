import { linkType, subjectType, withLRS } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { tableBodyTopology } from '../../../topologies/TableBody';
import TableCell from '../../../topologies/TableCell';
import TableRow from '../../../topologies/TableRow';

const ObservationTableBody = ({
  lrs,
  measures,
  subject,
}) => (
  <TableRow>
    {measures.map((property) => {
      const value = property && lrs.getResourceProperty(subject, property);
      if (!value) {
        return null;
      }

      return (
        <TableCell>
          {value?.value}
        </TableCell>
      );
    })}
  </TableRow>
);

ObservationTableBody.type = NS.qb('Observation');

ObservationTableBody.topology = tableBodyTopology;

ObservationTableBody.hocs = [withLRS];

ObservationTableBody.propTypes = {
  lrs: linkType,
  measures: linkType,
  subject: subjectType,
};

export default ObservationTableBody;
