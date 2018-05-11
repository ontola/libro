import LinkedRenderStore from 'link-lib';
import { link } from 'link-redux';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import { NS } from '../../../helpers/LinkedRenderStore';
import { setCurrentUser } from '../../../state/app/actions';

const propTypes = {
  actorType: PropTypes.string,
  onChange: PropTypes.func,
  primaryEmail: PropTypes.string,
};

class ActorTypeDispatcher extends Component {
  componentDidMount() {
    if (this.props.actorType) {
      this.props.onChange({
        actorType: this.props.actorType,
        primaryEmail: this.props.primaryEmail,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.actorType && this.props.actorType !== prevProps.actorType) {
      this.props.onChange({
        actorType: this.props.actorType,
        primaryEmail: this.props.primaryEmail,
      });
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
    onChange: (actorType, primaryEmail) => dispatch(setCurrentUser(actorType, primaryEmail)),
  }),
  null,
  { pure: false }
)(ActorTypeDispatcher);

ActorTypeDispatcherConnect.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  link([NS.argu('actorType'), NS.argu('primaryEmail')], { returnType: 'value' })(ActorTypeDispatcherConnect),
  [NS.argu('ConfirmedUser'), NS.argu('UnconfirmedUser'), NS.argu('GuestUser')],
  NS.argu('actorType'),
  NS.argu('sidebar')
);
