import { connect } from 'react-redux';

import { UserNavbar } from 'components/Navbar';

function mapStateToProps(state) {
  return {
    displayName: state.getIn(['currentActors', 'displayName']),
    shortname: state.getIn(['currentActors', 'shortname']),
  };
}

export default connect(mapStateToProps)(UserNavbar);
