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

import { entityIsLoaded } from '../../helpers/data';
import argu from '../../ontology/argu';
import { highlightContext } from '../../state/highlight';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';
import CardMicroRow, { cardMicroRowTopology } from '../../topologies/Card/CardMicroRow';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { listTopology } from '../../topologies/List';

const CommentSection = ({ subject }: SubjectProp): JSX.Element => {
  const lrs = useLRS();
  const [creator] = useIds(schema.creator);
  const { highlightState } = React.useContext(highlightContext);

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
