import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  register,
  useDataInvalidation,
  useIds,
  useLRS,
} from 'link-redux';
import { SubjectProp } from 'link-redux/dist-types/types';
import React from 'react';

import argu from '../../ontology/argu';
import {
  cardAppendixTopology,
  cardMicroRowTopology,
  cardRowTopology,
  listTopology,
} from '../../../../topologies';
import CardMicroRow from '../../../../topologies/Card/CardMicroRow';
import { entityIsLoaded } from '../../../Core/lib/data';
import { useHighlight } from '../../../Core/components/HighlightProvider/HighlightProvider';

const CommentSection = ({ subject }: SubjectProp): JSX.Element => {
  const lrs = useLRS();
  const [creator] = useIds(schema.creator);
  const { highlightState } = useHighlight();

  useDataInvalidation([creator, subject]);

  if (creator && !entityIsLoaded(lrs, creator)) {
    return <Resource subject={creator} />;
  }

  return (
    <CardMicroRow highlighted={subject.value === highlightState}>
      <Property
        label={schema.creator}
      />
      &#9;
      <Property label={schema.text} />
    </CardMicroRow>
  );
};

CommentSection.type = [
  schema.Comment,
  argu.Comment,
];

CommentSection.topology = [
  cardAppendixTopology,
  listTopology,
  cardMicroRowTopology,
  cardRowTopology,
];

export default register(CommentSection);
