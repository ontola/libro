import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import {
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import LDLink from '../../components/LDLink';
import { getMetaContent } from '../../helpers/arguHelpers';
import { NS } from '../../helpers/LinkedRenderStore';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { invalidStatuses } from '../Thing/properties/omniform/helpers';

import mapCardListDispatchToProps from './helpers';

const useStyles = makeStyles(() => ({
  buttonIcon: {
    height: '1.2rem',
    width: '1.2rem',
  },
}));

const InlineCreateActionContainerFloat = ({
  actionStatus,
  name,
  omniform,
  onClick,
}) => {
  const classes = useStyles();

  if (invalidStatuses.includes(actionStatus)) {
    return null;
  }

  const icon = (
    <FontAwesome
      className={classes.buttonIcon}
      name="plus"
    />
  );
  const useOmniform = omniform && getMetaContent('omniform') !== 'false';

  return (
    <IconButton
      size="small"
      title={name.value}
      type="button"
      onClick={useOmniform ? onClick : undefined}
    >
      {useOmniform ? icon : <LDLink>{icon}</LDLink>}
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
