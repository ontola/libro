import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import { NS } from '../../../helpers/LinkedRenderStore';
import { hexToRgb } from '../../../helpers/color';
import { setBaseColor } from '../../../state/sideBars/actions';

const propTypes = {
  linkedProp: linkedPropType,
  onChange: PropTypes.func,
};

class BaseColorDispatcher extends Component {
  componentDidMount() {
    if (this.props.linkedProp) {
      this.props.onChange(hexToRgb(this.props.linkedProp.value));
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.linkedProp && this.props.linkedProp !== prevProps.linkedProp) {
      this.props.onChange(hexToRgb(this.props.linkedProp));
    }
  }

  render() {
    return null;
  }
}

BaseColorDispatcher.propTypes = propTypes;

const BaseColorDispatcherConnect = connect(
  null,
  dispatch => ({
    onChange: rgbColor => dispatch(setBaseColor(rgbColor)),
  }),
  null,
  { pure: false }
)(BaseColorDispatcher);

BaseColorDispatcherConnect.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  BaseColorDispatcherConnect,
  [NS.schema('Thing'), NS.link('Document')],
  NS.argu('baseColor'),
  NS.argu('sidebar')
);
