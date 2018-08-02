import LinkedRenderStore from 'link-lib';
import { link, linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { NS } from '../../../helpers/LinkedRenderStore';
import { setCurrentUser } from '../../../state/app/actions';

const propTypes = {
  linkedProp: linkedPropType,
  onChange: PropTypes.func,
};

class ActorTypeDispatcher extends PureComponent {
  componentDidMount() {
    if (this.props.linkedProp) {
      this.props.onChange(this.props.linkedProp);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.linkedProp && this.props.linkedProp !== prevProps.linkedProp) {
      this.props.onChange(this.props.linkedProp);
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
      linkedProp: {
        actorType: ownProps.actorType,
        anonymousID: ownProps.anonymousID,
      },
    }
  ),
  { pure: false }
)(ActorTypeDispatcher);

ActorTypeDispatcherConnect.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  link([
    NS.argu('anonymousID'),
    NS.argu('actorType'),
  ], { returnType: 'value' })(ActorTypeDispatcherConnect),
  [NS.argu('ConfirmedUser'), NS.argu('UnconfirmedUser'), NS.argu('GuestUser')],
  NS.argu('actorType'),
  NS.argu('sidebar')
);
