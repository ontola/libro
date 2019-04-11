import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { checkLuminance, hexToRgb } from '../../helpers/color';
import { NS } from '../../helpers/LinkedRenderStore';
import { currentLocation } from '../../helpers/paths';
import { getCurrentUserType } from '../../state/app/selectors';
import Topology from '../Topology';

import './Navbar.scss';

export const navbarTopology = NS.app('topologies/navbar');

class Navbar extends Topology {
  constructor(props) {
    super(props);

    const textColor = __CLIENT__
      ? getComputedStyle(document.body).getPropertyValue('--navbar-color')
      : 'black';
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

function mapStateToProps(state, ownProps) {
  return {
    actorType: getCurrentUserType(state),
    redirectUrl: currentLocation(ownProps.location),
  };
}

export default withRouter(connect(mapStateToProps)(Navbar));
