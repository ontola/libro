import { linkedPropType, register } from 'link-redux';
import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import Detail from '../../../components/Detail';
import { NS } from '../../../helpers/LinkedRenderStore';
import { detailsBarTopology } from '../../../topologies/DetailsBar';

const messages = defineMessages({
  motionsCount: {
    defaultMessage: '{count} ideas',
    id: 'https://app.argu.co/i18n/argu:Motion/argu:motionsCount/label',
  },
});

class MotionsCount extends React.PureComponent {
  static type = NS.schema('Thing');

  static property = NS.argu('motionsCount');

  static topology = detailsBarTopology;

  static hocs = [injectIntl];

  static propTypes = {
    intl: intlShape,
    linkedProp: linkedPropType,
  };

  render() {
    const { intl: { formatMessage }, linkedProp } = this.props;

    if (linkedProp.value === '0') {
      return null;
    }

    return (
      <Detail
        icon="lightbulb-o"
        text={linkedProp.value}
        title={formatMessage(
          messages.motionsCount,
          { count: linkedProp.value }
        )}
      />
    );
  }
}

export default register(MotionsCount);
