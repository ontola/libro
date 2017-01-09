import React, { PropTypes } from 'react';
import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

import Grouped from './Grouped';
import SingleMember from './SingleMember';

const propTypes = {
  groupBy: PropTypes.string,
};

const Member = (props) => {
  const Klass = props.groupBy !== undefined ? Grouped : SingleMember;
  return <Klass {...props} />;
};

Member.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Member,
  'http://www.w3.org/ns/hydra/core#Collection',
  'http://www.w3.org/ns/hydra/core#member'
);

export default Member;
