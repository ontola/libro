import { connect } from 'react-redux';

import { checkLuminance, hexToRgb } from '../../helpers/color';
import { NS } from '../../helpers/LinkedRenderStore';
import { getCurrentUserType } from '../../state/app/selectors';
import Topology from '../Topology';

import './Navbar.scss';

export const navbarTopology = NS.app('topologies/navbar');

class Navbar extends Topology {
  constructor(props) {
    super(props);

    const textColor = getComputedStyle(document.body).getPropertyValue('--navbar-color');
    this.className = [
      'Navbar',
      'navbar-background',
      'navbar-color',
      'theme',
      checkLuminance(hexToRgb(textColor)) ? 'Navbar--dark-text' : 'Navbar--white-text',
    ].join(' ');

    this.topology = navbarTopology;
  }
}

function mapStateToProps(state) {
  return {
    actorType: getCurrentUserType(state),
    redirectUrl: window.location.href,
  };
}

export default connect(mapStateToProps)(Navbar);
