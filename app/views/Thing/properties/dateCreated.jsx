import { linkedPropType } from 'link-redux';
import React from 'react';

import { DetailDate } from '../../../components';
import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const DateCreated = ({ linkedProp }) => <DetailDate createdAt={linkedProp} />;

DateCreated.propTypes = propTypes;

[
  undefined,
  NS.argu('collection'),
].forEach((top) => {
  LinkedRenderStore.registerRenderer(
    DateCreated,
    NS.schema('Thing'),
    NS.schema('dateCreated'),
    top
  );
});

export default DateCreated;
