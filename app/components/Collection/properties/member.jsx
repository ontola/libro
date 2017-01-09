import React from 'react';
import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

import GroupedMemberProp from './grouped';
import SingleMember from './plain';

const Member = (props) => {
  const Klass = props.groupBy !== undefined ? null : SingleMember;
  return <Klass {...props} />
};

LinkedRenderStore.registerRenderer(
  Member,
  'http://www.w3.org/ns/hydra/core#Collection',
  'http://www.w3.org/ns/hydra/core#member'
);

export default Member;
