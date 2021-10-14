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

import { connectHighlighting } from '../../containers/Highlight';
import argu from '../../ontology/argu';
import CardMicroRow, { cardMicroRowTopology } from '../../topologies/Card/CardMicroRow';
import { entityIsLoaded } from '../../helpers/data';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardRowTopology } from '../../topologies/Card/CardRow';

interface CommentSectionProps extends SubjectProp {
  highlighted: boolean;
}

const CommentSection = ({ highlighted, subject }: CommentSectionProps): JSX.Element => {
  const lrs = useLRS();
  const [creator] = useIds(schema.creator);
  useDataInvalidation([creator, subject]);

  if (creator && !entityIsLoaded(lrs, creator)) {
    return <Resource subject={creator} />;
  }

  return (
    <CardMicroRow highlighted={highlighted}>
      <Property
        label={schema.creator}
      />
      &#9;
      <Property label={schema.text} />
    </CardMicroRow>
  );
};

CommentSection.hocs = [connectHighlighting];

CommentSection.type = [
  schema.Comment,
  argu.Comment,
];

CommentSection.topology = [
  cardAppendixTopology,
  cardListTopology,
  cardMicroRowTopology,
  cardRowTopology,
];

export default register(CommentSection);
