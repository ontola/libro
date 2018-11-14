import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link, linkType,
  Property,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { LDLink } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { omniformOpenInline, omniformSetAction } from '../../state/omniform';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardListTopology } from '../../topologies/Card/CardList';
import { invalidStatuses } from '../Thing/properties/omniform/helpers';

const mapActionsBarDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => Promise.resolve(dispatch(omniformOpenInline(ownProps.isPartOf))),
});

const mapCardListDispatchToProps = (dispatch, ownProps) => ({
  onClick: (e) => {
    e.preventDefault();
    return Promise.all([
      dispatch(omniformOpenInline(ownProps.isPartOf)),
      dispatch(omniformSetAction({
        action: ownProps.subject,
        parentIRI: btoa(ownProps.isPartOf),
      })),
    ]);
  },
});

const InlineCreateActionButton = ({
  actionStatus,
  omniform,
  onClick,
  subject,
}) => {
  if (invalidStatuses.includes(actionStatus)) {
    return null;
  }

  return (
    <LDLink subject={subject}>
      <Property label={NS.schema('name')} onClick={omniform && onClick} />
    </LDLink>
  );
};

InlineCreateActionButton.displayName = 'InlineCreateActionButton';
InlineCreateActionButton.propTypes = {
  actionStatus: linkType,
  omniform: PropTypes.bool,
  onClick: PropTypes.func,
  subject: subjectType,
};

export default [
  LinkedRenderStore.registerRenderer(
    link([
      NS.schema('object'),
      NS.schema('actionStatus'),
    ])(connect(null, mapActionsBarDispatchToProps)(InlineCreateActionButton)),
    NS.argu('CreateAction'),
    RENDER_CLASS_NAME,
    actionsBarTopology
  ),
  LinkedRenderStore.registerRenderer(
    link([
      NS.schema('object'),
      NS.schema('actionStatus'),
    ])(connect(null, mapCardListDispatchToProps)(InlineCreateActionButton)),
    NS.schema('CreateAction'),
    RENDER_CLASS_NAME,
    [cardListTopology, cardFloatTopology]
  ),
];
