import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import argu from '../../../../Argu/ontology/argu';
import CardContent from '../../../components/Card/CardContent';
import {
  containerTopology,
  inlineTopology,
  mainBodyTopology, 
} from '../../../topologies';
import Card from '../../../topologies/Card';

interface TrashedAtProps {
  linkedProp: NamedNode;
}

const TrashedAt: FC<TrashedAtProps> = ({ linkedProp }) => {
  const { formatDate } = useIntl();
  const [trashActivity] = useProperty(argu.trashActivity);

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
        {trashActivity && (
          <Resource subject={trashActivity}>
            <div>
              <Property
                label={schema.text}
                topology={inlineTopology}
              />
            </div>
          </Resource>
        )}
      </CardContent>
    </Card>
  );
};

TrashedAt.type = schema.Thing;

TrashedAt.property = argu.trashedAt;

TrashedAt.topology = [
  containerTopology,
  mainBodyTopology,
];

export default register(TrashedAt);
