import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import { CardContent } from '../../../components';
import { formatDate } from '../../../helpers/date';
import { NS } from '../../../helpers/LinkedRenderStore';
import Card from '../../../topologies/Card';

const propTypes = {
  linkedProp: linkedPropType,
};

const TrashedAt = ({ linkedProp }) => (
  <Card warn>
    <CardContent endSpacing>
      Dit item is verwijderd op {formatDate(linkedProp.value)}
    </CardContent>
  </Card>
);

TrashedAt.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  TrashedAt,
  NS.schema('Thing'),
  NS.argu('trashedAt'),
  NS.argu('container')
);
