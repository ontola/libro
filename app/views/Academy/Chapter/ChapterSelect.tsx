import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';
import * as schema from '@ontologies/schema';

import argu from '../../../ontology/argu';
import { selectTopology } from '../../../topologies/Select';

const ChapterSelect: FC = () => (<Property label={schema.title} />);

ChapterSelect.type = argu.Chapter;

ChapterSelect.topology = selectTopology;

export default register(ChapterSelect);
