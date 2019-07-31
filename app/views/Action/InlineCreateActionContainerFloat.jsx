import IconButton from '@material-ui/core/IconButton';
import {
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { NS } from '../../helpers/LinkedRenderStore';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { invalidStatuses } from '../Thing/properties/omniform/helpers';

import mapCardListDispatchToProps from './helpers';

const InlineCreateActionContainerFloat = ({
  actionStatus,
  name,
  omniform,
  onClick,
}) => {
  if (invalidStatuses.includes(actionStatus)) {
    return null;
  }

  return (
    <IconButton
      size="small"
      title={name.value}
      type="button"
      onClick={omniform ? onClick : undefined}
    >
      <FontAwesome name="plus" />
    </IconButton>
  );
};

InlineCreateActionContainerFloat.type = NS.schema('CreateAction');

InlineCreateActionContainerFloat.topology = [
  containerFloatTopology,
];

InlineCreateActionContainerFloat.mapDataToProps = [
  NS.schema('object'),
  NS.schema('actionStatus'),
  NS.schema('name'),
];

InlineCreateActionContainerFloat.hocs = [connect(null, mapCardListDispatchToProps)];

InlineCreateActionContainerFloat.displayName = 'InlineCreateActionContainerFloatButton';

InlineCreateActionContainerFloat.propTypes = {
  actionStatus: linkType,
  name: linkType,
  omniform: PropTypes.bool,
  onClick: PropTypes.func,
};

export default register(InlineCreateActionContainerFloat);
