import schema from '@ontologies/schema';
import {
  LinkedResourceContainer,
  linkType,
  register,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import LDLink from '../../../components/LDLink';
import { NS } from '../../../helpers/LinkedRenderStore';
import { tryParseInt } from '../../../helpers/numbers';
import { cardAppendixTopology } from '../../../topologies/Card/CardAppendix';
import CardMicroRow from '../../../topologies/Card/CardMicroRow';
import CardRow from '../../../topologies/Card/CardRow';

class TopComment extends React.PureComponent {
  static type = schema.Thing;

  static property = NS.argu('topComment');

  static topology = cardAppendixTopology;

  static mapDataToProps = {
    commentsCount: NS.argu('commentsCount'),
    topComment: NS.argu('topComment'),
  };

  static propTypes = {
    commentsCount: linkType,
    topComment: linkType,
  };

  render() {
    const {
      commentsCount,
      topComment,
    } = this.props;

    const count = tryParseInt(commentsCount);

    return (
      <CardRow backdrop>
        <LinkedResourceContainer subject={topComment} />
        {count > 1 && (
          <CardMicroRow>
            <LDLink>
              <FormattedMessage
                defaultMessage="View all {count} reactions..."
                id="https://app.argu.co/i18n/schema:Thing/argu:topComment/showAllLabel"
                values={{ count }}
              />
            </LDLink>
          </CardMicroRow>
        )}
      </CardRow>
    );
  }
}

export default register(TopComment);
