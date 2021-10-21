import * as schema from '@ontologies/schema';
import {
  Resource,
  register,
  useIds,
  useNumbers,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import LDLink from '../../../components/LDLink';
import argu from '../../../ontology/argu';
import { cardAppendixTopology } from '../../../topologies/Card/CardAppendix';
import CardMicroRow from '../../../topologies/Card/CardMicroRow';
import CardRow from '../../../topologies/Card/CardRow';
import { thingMessages } from '../../../translations/messages';

const TopComment = (): JSX.Element => {
  const [count] = useNumbers(argu.commentsCount);
  const [topComment] = useIds(argu.topComment);

  return (
    <CardRow
      backdrop
      borderTop
    >
      <Resource subject={topComment} />
      {count > 1 && (
        <CardMicroRow>
          <LDLink>
            <FormattedMessage
              {...thingMessages.showAllLabel}
              values={{ count }}
            />
          </LDLink>
        </CardMicroRow>
      )}
    </CardRow>
  );
};

TopComment.type = schema.Thing;

TopComment.property = argu.topComment;

TopComment.topology = cardAppendixTopology;

export default register(TopComment);
