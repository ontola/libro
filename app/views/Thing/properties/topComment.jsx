import { LinkedResourceContainer, linkType, register } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import LDLink from '../../../components/LDLink';
import { NS } from '../../../helpers/LinkedRenderStore';
import { cardAppendixTopology } from '../../../topologies/Card/CardAppendix';
import CardMicroRow from '../../../topologies/Card/CardMicroRow';
import CardRow from '../../../topologies/Card/CardRow';

class TopComment extends React.PureComponent {
  static type = NS.schema('Thing');

  static topology = cardAppendixTopology;

  static property = NS.argu('topComment');

  static mapDataToProps = [
    NS.argu('topComment'),
    NS.argu('commentsCount'),
  ];

  static propTypes = {
    commentsCount: linkType,
    topComment: linkType,
  };

  render() {
    const {
      commentsCount,
      topComment,
    } = this.props;

    const count = Number(commentsCount);

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
