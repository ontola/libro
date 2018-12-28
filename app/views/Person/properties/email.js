import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import { NS } from '../../../helpers/LinkedRenderStore';
import { setCurrentUserEmail } from '../../../state/app/actions';
import { headerTopology } from '../../../topologies/Header';


const propTypes = {
  linkedProp: linkedPropType,
  onChange: PropTypes.func,
};

class EmailDispatcher extends Component {
  componentDidMount() {
    if (this.props.linkedProp) {
      this.props.onChange(this.props.linkedProp.value);
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

EmailDispatcher.propTypes = propTypes;

const EmailDispatcherConnect = connect(
  null,
  dispatch => ({
    onChange: email => dispatch(setCurrentUserEmail(email)),
  }),
  null,
  { pure: false }
)(EmailDispatcher);

EmailDispatcherConnect.propTypes = propTypes;


export default LinkedRenderStore.registerRenderer(
  EmailDispatcherConnect,
  NS.schema('Person'),
  NS.schema('email'),
  headerTopology
);
