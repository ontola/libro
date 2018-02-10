import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import { DetailDate } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const DateCreated = ({ linkedProp }) => <DetailDate createdAt={linkedProp.value} />;

DateCreated.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  DateCreated,
  NS.schema('Thing'),
  NS.schema('dateCreated'),
  [
    undefined,
    NS.argu('card'),
    NS.argu('cardFixed'),
    NS.argu('cardMain'),
    NS.argu('cardRow'),
    NS.argu('collection'),
    NS.argu('container'),
    NS.argu('detail'),
    NS.argu('inline'),
    NS.argu('sidebar'),
    NS.argu('sidebarBlock'),
    NS.argu('section'),
    NS.argu('grid'),
    NS.argu('widget'),
  ]
);
