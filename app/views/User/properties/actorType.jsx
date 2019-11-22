import LinkedRenderStore from 'link-lib';
import { link } from 'link-redux';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { NS } from '../../../helpers/LinkedRenderStore';
import { setCurrentUser } from '../../../state/app/actions';
import { navbarTopology } from '../../../topologies/Navbar';

const propTypes = {
  action: PropTypes.shape({
    actorType: PropTypes.string,
    anonymousID: PropTypes.string,
  }),
  onChange: PropTypes.func,
};

class ActorTypeDispatcher extends PureComponent {
  componentDidMount() {
    if (this.props.action) {
      this.props.onChange(this.props.action);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.action && this.props.action !== prevProps.action) {
      this.props.onChange(this.props.action);
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
    onChange: payload => dispatch(setCurrentUser(payload)),
  }),
  (_sP, dispatchProps, ownProps) => Object.assign(
    {},
    dispatchProps,
    {
      action: {
        actorType: ownProps.actorType,
        anonymousID: ownProps.anonymousID,
      },
    }
  ),
  { pure: false }
)(ActorTypeDispatcher);

ActorTypeDispatcherConnect.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  link({
    actorType: NS.ontola('actorType'),
    anonymousID: NS.argu('anonymousID'),
  }, { returnType: 'value' })(ActorTypeDispatcherConnect),
  [
    NS.ontola('ConfirmedUser'),
    NS.ontola('UnconfirmedUser'),
    NS.ontola('GuestUser'),
  ],
  NS.ontola('actorType'),
  navbarTopology
);
