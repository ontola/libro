import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import {
  linkType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { filterFind } from '../../helpers/data';
import { retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { OMNIFORM_FILTER, invalidStatuses } from '../Thing/properties/omniform/helpers';

import mapCardListDispatchToProps from './helpers';

const useStyles = makeStyles(() => ({
  buttonIcon: {
    height: '1.2rem',
    width: '1.2rem',
  },
}));

const InlineCreateActionContainerFloat = ({
  actionStatus,
  history,
  name,
  omniform,
  onClick,
  subject,
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
  const useOmniform = omniform && OMNIFORM_FILTER.find(filterFind(subject));

  return (
    <IconButton
      size="small"
      title={name.value}
      type="button"
      onClick={useOmniform ? onClick : () => history.push(retrievePath(subject.value))}
    >
      {icon}
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

InlineCreateActionContainerFloat.hocs = [
  connect(null, mapCardListDispatchToProps),
  withRouter,
];

InlineCreateActionContainerFloat.displayName = 'InlineCreateActionContainerFloatButton';

InlineCreateActionContainerFloat.propTypes = {
  actionStatus: linkType,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  name: linkType,
  omniform: PropTypes.bool,
  onClick: PropTypes.func,
  subject: subjectType,
};

export default register(InlineCreateActionContainerFloat);
