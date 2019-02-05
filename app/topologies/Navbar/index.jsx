import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { checkLuminance } from '../../helpers/color';
import { NS } from '../../helpers/LinkedRenderStore';
import { getCurrentUserType } from '../../state/app/selectors';
import { getSideBarColor } from '../../state/sideBars/selectors';
import Topology from '../Topology';

import './Navbar.scss';

export const navbarTopology = NS.app('topologies/navbar');

class Navbar extends Topology {
  static propTypes = {
    orgColor: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.topology = navbarTopology;
  }

  getClassName() {
    const { orgColor } = this.props;

    return [
      'Navbar',
      'theme',
      checkLuminance(orgColor) ? 'Navbar--white-text' : 'Navbar--dark-text',
    ].join(' ');
  }

  getStyle() {
    return {
      '--theme-background': this.props.orgColor,
      backgroundColor: this.props.orgColor,
      color: 'white',
    };
  }
}

function mapStateToProps(state) {
  return {
    actorType: getCurrentUserType(state),
    orgColor: getSideBarColor(state),
    redirectUrl: window.location.href,
  };
}

export default connect(mapStateToProps)(Navbar);
