import IconButton from '@material-ui/core/IconButton';
import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  linkType,
  register,
  subjectType,
  useDataInvalidation,
  useLRS,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { entityIsLoaded, filterFind } from '../../helpers/data';
import { normalizeFontAwesomeIRI, retrievePath } from '../../helpers/iris';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { OMNIFORM_FILTER, invalidStatusIds } from '../Thing/properties/omniform/helpers';

import mapCardListDispatchToProps from './helpers';

const InlineActionContainerFloat = ({
  actionStatus,
  history,
  name,
  omniform,
  onClick,
  subject,
  target,
}) => {
  const lrs = useLRS();
  const [image] = useResourceProperty(target, schema.image);
  useDataInvalidation(target);

  if (invalidStatusIds.includes(rdf.id(actionStatus))) {
    return null;
  }

  if (__CLIENT__ && target && !entityIsLoaded(lrs, target)) {
    lrs.queueEntity(target);
  }

  const icon = (
    <FontAwesome
      name={image && normalizeFontAwesomeIRI(image)}
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

InlineActionContainerFloat.type = schema.Action;

InlineActionContainerFloat.topology = [
  containerFloatTopology,
];

InlineActionContainerFloat.mapDataToProps = {
  actionStatus: schema.actionStatus,
  name: schema.name,
  object: schema.object,
  target: schema.target,
};

InlineActionContainerFloat.hocs = [
  connect(null, mapCardListDispatchToProps),
  withRouter,
];

InlineActionContainerFloat.displayName = 'InlineActionContainerFloatButton';

InlineActionContainerFloat.propTypes = {
  actionStatus: linkType,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  name: linkType,
  omniform: PropTypes.bool,
  onClick: PropTypes.func,
  subject: subjectType,
  target: linkType,
};

export default register(InlineActionContainerFloat);
