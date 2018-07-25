import { connect } from 'react-redux';

import { NavBarContent } from '../components';
import { getCurrentUserType } from '../state/app/selectors';
import { getSideBarColor } from '../state/sideBars/selectors';

function mapStateToProps(state) {
  return {
    actorType: getCurrentUserType(state),
    orgColor: getSideBarColor(state),
    redirectUrl: window.location.href,
  };
}

export default connect(mapStateToProps)(NavBarContent);
