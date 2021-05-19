import {
  FC,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import * as schema from '@ontologies/schema';
import React from 'react';

import argu from '../../../ontology/argu';
import { pageTopology } from '../../../topologies/Page';

const FullPageChapter: FC = ({ subject }) => {
  const [book] = useProperty(schema.isPartOf);

  return <Resource chapter={subject} subject={book} />;
};

FullPageChapter.type = [argu.Chapter];
FullPageChapter.topology = pageTopology;

export default register(FullPageChapter);
