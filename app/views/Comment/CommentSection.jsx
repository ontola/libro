import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  register,
  subjectType,
  useDataInvalidation,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import { connectHighlighting, hightlightPropTypes } from '../../containers/Highlight';
import argu from '../../ontology/argu';
import CardMicroRow, { cardMicroRowTopology } from '../../topologies/Card/CardMicroRow';
import { entityIsLoaded } from '../../helpers/data';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardRowTopology } from '../../topologies/Card/CardRow';

const CommentSection = ({ highlighted, subject }) => {
  const lrs = useLRS();
  const [creator] = useProperty(schema.creator);
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

CommentSection.propTypes = {
  subject: subjectType,
  ...hightlightPropTypes,
};

export default register(CommentSection);
