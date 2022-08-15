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

import {
  cardAppendixTopology,
  cardMicroRowTopology,
  cardRowTopology,
  listTopology,
} from '../../../Common/topologies';
import CardMicroRow from '../../../Common/topologies/Card/CardMicroRow';
import { useHighlight } from '../../../Common/components/HighlightProvider/HighlightProvider';
import { entityIsLoaded } from '../../../Kernel/lib/data';
import argu from '../../ontology/argu';

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
