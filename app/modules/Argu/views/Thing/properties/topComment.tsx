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

import Link, { LinkTarget } from '../../../../Common/components/Link';
import { cardAppendixTopology } from '../../../../Common/topologies';
import CardMicroRow from '../../../../Common/topologies/Card/CardMicroRow';
import CardRow from '../../../../Common/topologies/Card/CardRow';
import ontola from '../../../../Kernel/ontology/ontola';
import { commentMessages } from '../../../lib/messages';
import argu from '../../../ontology/argu';

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
                  {...commentMessages.showAllLabel}
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
