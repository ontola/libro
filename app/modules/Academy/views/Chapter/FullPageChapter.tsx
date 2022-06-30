import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import argu from '../../../Argu/lib/argu';
import Metadata from '../../../Common/components/Metadata';
import { pageTopology } from '../../../Common/topologies/Page';

const FullPageChapter: FC = ({ subject }) => {
  const [book] = useProperty(schema.isPartOf);

  return (
    <React.Fragment>
      <Metadata />
      <Resource
        chapter={subject}
        subject={book}
      />
    </React.Fragment>
  );
};

FullPageChapter.type = [argu.Chapter];

FullPageChapter.topology = pageTopology;

export default register(FullPageChapter);
