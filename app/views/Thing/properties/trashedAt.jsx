import schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { CardContent } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import Card from '../../../topologies/Card';
import { containerTopology } from '../../../topologies/Container';

const TrashedAt = ({ linkedProp }) => {
  const { formatTime } = useIntl();

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
};

TrashedAt.type = schema.Thing;

TrashedAt.property = NS.argu('trashedAt');

TrashedAt.topology = containerTopology;

TrashedAt.propTypes = {
  linkedProp: linkedPropType,
};

export default register(TrashedAt);
