import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  linkedPropType,
  Property,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LDLink } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { omniformOpenInline, omniformSetAction } from '../../state/omniform';
import { allTopologiesExcept } from '../../topologies';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardListTopology } from '../../topologies/Card/CardList';

const propTypes = {
  children: PropTypes.element,
};

class CreateActionButton extends Component {
  render() {
    if (this.props.children) {
      return this.props.children;
    }

    return (
      <LDLink>
        <Property label={NS.schema('target')} />
      </LDLink>
    );
  }
}

CreateActionButton.propTypes = propTypes;

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

const InlineCreateActionButton = ({ isPartOf, onClick, subject }) => (
  <CreateActionButton isPartOf={isPartOf} subject={subject}>
    <Property label={NS.schema('target')} onClick={onClick} />
  </CreateActionButton>
);

InlineCreateActionButton.propTypes = {
  isPartOf: linkedPropType,
  onClick: PropTypes.func,
  subject: subjectType,
};

export default [
  LinkedRenderStore.registerRenderer(
    CreateActionButton,
    NS.schema('CreateAction'),
    RENDER_CLASS_NAME,
    allTopologiesExcept([actionsBarTopology, cardListTopology, cardFloatTopology])
  ),
  LinkedRenderStore.registerRenderer(
    link([NS.schema('object')])(connect(null, mapActionsBarDispatchToProps)(InlineCreateActionButton)),
    NS.argu('CreateAction'),
    RENDER_CLASS_NAME,
    actionsBarTopology
  ),
  LinkedRenderStore.registerRenderer(
    link([NS.schema('object')])(connect(null, mapCardListDispatchToProps)(InlineCreateActionButton)),
    NS.schema('CreateAction'),
    RENDER_CLASS_NAME,
    [cardListTopology, cardFloatTopology]
  ),
];
