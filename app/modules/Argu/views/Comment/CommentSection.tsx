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

import { cardAppendixTopology } from '../../../Common/topologies/Card/CardAppendix';
import CardMicroRow, { cardMicroRowTopology } from '../../../Common/topologies/Card/CardMicroRow';
import { cardRowTopology } from '../../../Common/topologies/Card/CardRow';
import { listTopology } from '../../../Common/topologies/List';
import { useHighlight } from '../../../Core/components/HighlightProvider/HighlightProvider';
import { entityIsLoaded } from '../../../Core/lib/data';
import argu from '../../lib/argu';

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
