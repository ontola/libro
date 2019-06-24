import { LinkType, register } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';
import LDLink from '../../../components/LDLink';
import Heading from '../../../components/Heading';
import CardContent from '../../../components/Card/CardContent';

const CollectionPageBaseCollection = ({ linkedProp }) => (
  <CardContent>
    <LDLink to={linkedProp}>
      <Heading size="3">
        <FormattedMessage
          defaultMessage="View all items"
          id="https://app.argu.co/i18n/collection/readAll"
        />
      </Heading>
    </LDLink>
  </CardContent>
);

CollectionPageBaseCollection.type = NS.as('CollectionPage');

CollectionPageBaseCollection.property = NS.ontola('baseCollection');

CollectionPageBaseCollection.propTypes = {
  linkedProp: LinkType,
};

CollectionPageBaseCollection.topology = allTopologies;

export default register(CollectionPageBaseCollection);
