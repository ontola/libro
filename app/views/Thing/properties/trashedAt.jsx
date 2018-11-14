import { linkedPropType, register } from 'link-redux';
import React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';

import { CardContent } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import Card from '../../../topologies/Card';
import { containerTopology } from '../../../topologies/Container';

class TrashedAt extends React.PureComponent {
  static type = NS.schema('Thing');

  static property = NS.argu('trashedAt');

  static topology = containerTopology;

  static propTypes = {
    intl: intlShape,
    linkedProp: linkedPropType,
  };

  render() {
    const { intl: { formatTime }, linkedProp } = this.props;

    return (
      <Card warn>
        <CardContent endSpacing>
          <FormattedMessage
            defaultMessage="This resource has been deleted on {date}"
            id="https://app.argu.co/i18n/trashable/deletedNotice"
            values={{
              date: formatTime(linkedProp.value),
            }}
          />
        </CardContent>
      </Card>
    );
  }
}

export default register(TrashedAt);
