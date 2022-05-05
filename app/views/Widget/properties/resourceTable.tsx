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

import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { tableRowTopology } from '../../../topologies';
import { namePredicates } from '../../Thing/properties/name';

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
