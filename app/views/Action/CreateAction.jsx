import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, linkedPropType, Property, subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { NS, allTopologiesExcept } from '../../helpers/LinkedRenderStore';
import { omniformAddAction, omniformOpenInline } from '../../state/omniform';

const propTypes = {
  children: PropTypes.element,
  isPartOf: linkedPropType,
  onChange: PropTypes.func,
  subject: subjectType,
};

class CreateActionDispatcher extends Component {
  componentDidMount() {
    this.props.onChange(this.identifier(), this.props.subject.value);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.subject) {
      this.props.onChange(this.identifier(), nextProps.subject.value);
    }
  }

  identifier() {
    return btoa(this.props.isPartOf || this.props.subject);
  }

  render() {
    if (this.props.children) {
      return this.props.children;
    }

    return null;
  }
}

CreateActionDispatcher.propTypes = propTypes;

const mapDispatchToProps = dispatch => ({
  onChange: (parent, action) => dispatch(omniformAddAction(parent, action)),
});

const BoundCreateActionDispatcher = connect(
  null,
  mapDispatchToProps,
  null,
  { pure: false }
)(CreateActionDispatcher);

const mapActionsBarDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => Promise.resolve(dispatch(omniformOpenInline(ownProps.isPartOf))),
});

const CreateActionButton = ({ isPartOf, onClick, subject }) => (
  <BoundCreateActionDispatcher isPartOf={isPartOf} subject={subject}>
    <Property label={NS.schema('target')} onClick={onClick} />
  </BoundCreateActionDispatcher>
);

CreateActionButton.propTypes = {
  isPartOf: linkedPropType,
  onClick: PropTypes.func,
  subject: subjectType,
};

export default [
  LinkedRenderStore.registerRenderer(
    BoundCreateActionDispatcher,
    NS.argu('CreateAction'),
    RENDER_CLASS_NAME,
    allTopologiesExcept(NS.argu('actionsBar'))
  ),
  LinkedRenderStore.registerRenderer(
    link([NS.schema('object')])(connect(null, mapActionsBarDispatchToProps)(CreateActionButton)),
    NS.argu('CreateAction'),
    RENDER_CLASS_NAME,
    NS.argu('actionsBar')
  ),
];
