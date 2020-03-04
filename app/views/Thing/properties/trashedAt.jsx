import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import CardContent from '../../../components/Card/CardContent';
import argu from '../../../ontology/argu';
import Card from '../../../topologies/Card';
import { containerTopology } from '../../../topologies/Container';
import { inlineTopology } from '../../../topologies/Inline';

const TrashedAt = ({ linkedProp, trashActivity }) => {
  const { formatDate } = useIntl();

  return (
    <Card warn>
      <CardContent endSpacing>
        <FormattedMessage
          defaultMessage="This resource has been deleted on {date}"
          id="https://app.argu.co/i18n/trashable/deletedNotice"
          values={{
            date: formatDate(linkedProp.value),
          }}
        />
        <Resource subject={trashActivity}>
          <div><Property label={schema.text} topology={inlineTopology} /></div>
        </Resource>
      </CardContent>
    </Card>
  );
};

TrashedAt.type = schema.Thing;

TrashedAt.property = argu.trashedAt;

TrashedAt.topology = containerTopology;

TrashedAt.mapDataToProps = {
  trashActivity: argu.trashActivity,
};

TrashedAt.propTypes = {
  linkedProp: linkedPropType,
  trashActivity: linkType,
};

export default register(TrashedAt);
