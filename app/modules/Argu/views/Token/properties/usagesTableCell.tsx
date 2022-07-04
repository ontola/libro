import {
  FC,
  PropertyProps,
  register,
  useNumbers,
} from 'link-redux';
import React from 'react';

import { tableRowTopology } from '../../../../Table/topologies/TableRow';
import argu from '../../../ontology/argu';

const UsagesTableCell: FC<PropertyProps> = () => {
  const [usages] = useNumbers(argu.usages);
  const [maxUsages] = useNumbers(argu.maxUsages);

  if (maxUsages === undefined || !usages === undefined) {
    return (
      <React.Fragment>
        {usages}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {usages}
      /
      {maxUsages}
    </React.Fragment>
  );
};

UsagesTableCell.type = argu.BearerToken;

UsagesTableCell.property = argu.usages;

UsagesTableCell.topology = tableRowTopology;

export default register(UsagesTableCell);
