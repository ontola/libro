import { linkedPropType, register } from 'link-redux';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import { NS } from '../../../helpers/LinkedRenderStore';
import { hexToRgb } from '../../../helpers/color';
import { setBaseColor } from '../../../state/sideBars/actions';
import { navbarTopology } from '../../../topologies/Navbar';

const propTypes = {
  linkedProp: linkedPropType,
  onChange: PropTypes.func,
};

const colorDispatcher = connect(
  null,
  dispatch => ({
    onChange: rgbColor => dispatch(setBaseColor(rgbColor)),
  }),
  null,
  { pure: false }
);

class BaseColorDispatcher extends Component {
  static type = [NS.schema('Thing'), NS.link('Document')];

  static property = NS.argu('baseColor');

  static topology = navbarTopology;

  static hocs = [colorDispatcher];

  componentDidMount() {
    if (this.props.linkedProp) {
      this.props.onChange(hexToRgb(this.props.linkedProp.value));
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.linkedProp !== prevProps.linkedProp) {
      this.props.onChange(hexToRgb(this.props.linkedProp));
    }
  }

  render() {
    return null;
  }
}

BaseColorDispatcher.propTypes = propTypes;

export default register(BaseColorDispatcher);
