import React, { PropTypes } from 'react';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';
import {
  DetailDate,
} from 'components';

const propTypes = {
  linkedProp: PropTypes.object,
};

const DateCreated = ({ linkedProp }) => <DetailDate createdAt={linkedProp} />;

DateCreated.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  DateCreated,
  'http://schema.org/CreativeWork',
  'http://schema.org/dateCreated'
);

export default DateCreated;
