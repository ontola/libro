import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  register,
  useBooleans,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { mainBodyTopology } from '../../../topologies';

interface MapQuestionLocationProps {
  linkedProp: SomeNode;
}

const MapQuestionLocation: FC<MapQuestionLocationProps> = () => {
  const [hasLargeMap] = useBooleans(argu.mapQuestion);

  if (hasLargeMap === true) {
    return null;
  }

  return (
    <Property label={schema.location} />
  );
};

MapQuestionLocation.type = argu.Question;

MapQuestionLocation.property = [argu.mapQuestion];

MapQuestionLocation.topology = mainBodyTopology;

export default register(MapQuestionLocation);
