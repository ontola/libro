import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import { NS } from '../../../helpers/LinkedRenderStore';
import { setCurrentUserType } from '../../../state/app/actions';

const propTypes = {
  linkedProp: linkedPropType,
  onChange: PropTypes.func,
};

class ActorTypeDispatcher extends Component {
  componentDidMount() {
    if (this.props.linkedProp) {
      this.props.onChange(this.props.linkedProp.value);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.linkedProp && this.props.linkedProp !== prevProps.linkedProp) {
      this.props.onChange(this.props.linkedProp.value);
    }
  }

  render() {
    return null;
  }
}

ActorTypeDispatcher.propTypes = propTypes;

const ActorTypeDispatcherConnect = connect(
  null,
  dispatch => ({
    onChange: actorType => dispatch(setCurrentUserType(actorType)),
  }),
  null,
  { pure: false }
)(ActorTypeDispatcher);

ActorTypeDispatcherConnect.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  ActorTypeDispatcherConnect,
  [NS.argu('ConfirmedUser'), NS.argu('UnconfirmedUser'), NS.argu('GuestUser')],
  NS.argu('actorType'),
  NS.argu('sidebar')
);
