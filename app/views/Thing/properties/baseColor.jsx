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
  setBaseColor: PropTypes.func,
};

class BaseColorDispatcher extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.linkedProp) {
      this.props.setBaseColor(hexToRgb(nextProps.linkedProp));
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
    setBaseColor: rgbColor => dispatch(setBaseColor(rgbColor)),
  }),
  null,
  { pure: false }
)(BaseColorDispatcher);

BaseColorDispatcherConnect.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  BaseColorDispatcherConnect,
  [NS.schema('Thing'), NS.link('Document')],
  NS.argu('baseColor'),
  NS.argu('sidebarBlock')
);
