import * as rdfs from '@ontologies/rdfs';
import {
  FC,
  PropertyProps,
  dig,
  register,
  useIds,
  useStrings,
} from 'link-redux';
import React from 'react';

import { namePredicates } from '../../../../Common/lib/predicates';
import ontola from '../../../../Kernel/ontology/ontola';
import { tableRowTopology } from '../../../../Table/topologies';
import argu from '../../../ontology/argu';

const ResourceTable: FC<PropertyProps> = () => {
  const subjects = useIds(dig(ontola.widgetResource, rdfs.member, rdfs.member));
  const names = useStrings(subjects, namePredicates);
  const label = names.map((value, i) => value[0] ?? subjects[i].value).join(', ');

  return (
    <div title={subjects.join(', ')}>
      {label}
    </div>
  );
};

ResourceTable.type = ontola.Widget;

ResourceTable.property = argu.rawResource;

ResourceTable.topology = tableRowTopology;

export default register(ResourceTable);
