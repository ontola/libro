import * as schema from '@ontologies/schema';
import {
  Resource,
  register,
  useGlobalIds,
  useIds,
  useNumbers,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Link, { LinkTarget } from '../../../components/Link';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { cardAppendixTopology } from '../../../topologies';
import CardMicroRow from '../../../topologies/Card/CardMicroRow';
import CardRow from '../../../topologies/Card/CardRow';
import { thingMessages } from '../../../translations/messages';

const TopComment = (): JSX.Element => {
  const [count] = useNumbers(argu.commentsCount);
  const [topComment] = useIds(argu.topComment);
  const [breadcrumb] = useGlobalIds(topComment, ontola.breadcrumb);
  const [parent] = useGlobalIds(topComment, schema.isPartOf);
  const showAll = breadcrumb ?? parent;

  return (
    <CardRow
      borderTop
    >
      <Resource subject={topComment} />
      {count > 1 && (
        <Resource subject={topComment}>
          {showAll && (
            <CardMicroRow>
              <Link
                target={LinkTarget.Top}
                to={showAll.value}
              >
                <FormattedMessage
                  {...thingMessages.showAllLabel}
                  values={{ count }}
                />
              </Link>
            </CardMicroRow>
          )}
        </Resource>
      )}
    </CardRow>
  );
};

TopComment.type = schema.Thing;

TopComment.property = argu.topComment;

TopComment.topology = cardAppendixTopology;

export default register(TopComment);
