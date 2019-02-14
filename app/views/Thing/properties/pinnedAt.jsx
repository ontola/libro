import { linkedPropType, register } from 'link-redux';
import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import Detail from '../../../components/Detail';
import { NS } from '../../../helpers/LinkedRenderStore';
import { detailsBarTopology } from '../../../topologies/DetailsBar';

const messages = defineMessages({
  pinnedAtLabel: {
    defaultMessage: 'Pinned at {date}',
    id: 'https://app.argu.co/i18n/pinnable/states/pinned/pinnedAtLabel',
  },
});

class PinnedAt extends React.PureComponent {
  static type = NS.schema('Thing');

  static property = NS.argu('pinnedAt');

  static topology = detailsBarTopology;

  static hocs = [injectIntl];

  static propTypes = {
    intl: intlShape,
    linkedProp: linkedPropType,
  };

  render() {
    const { intl: { formatDate, formatMessage }, linkedProp } = this.props;

    return (
      <Detail
        icon="thumb-tack"
        title={formatMessage(
          messages.pinnedAtLabel,
          { date: formatDate(new Date(linkedProp.value)) }
        )}
      />
    );
  }
}

export default register(PinnedAt);
