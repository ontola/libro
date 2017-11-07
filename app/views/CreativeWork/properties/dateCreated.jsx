import { linkedPropType } from 'link-redux';
import React from 'react';

import { DetailDate } from '../../../components';
import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const DateCreated = ({ linkedProp }) => <DetailDate createdAt={linkedProp} />;

DateCreated.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  DateCreated,
  NS.schema('CreativeWork'),
  NS.schema('dateCreated')
);

export default DateCreated;
