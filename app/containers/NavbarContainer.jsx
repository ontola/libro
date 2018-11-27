import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { NavBarContent } from '../components';
import { getCurrentUserType } from '../state/app/selectors';
import { getSideBarColor } from '../state/sideBars/selectors';

const messages = defineMessages({
  navbarError: {
    defaultMessage: 'Application error, try reloading the page',
    id: 'https://app.argu.co/i18n/navbar/renderError',
  },
});

class NavbarContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      caughtError: undefined,
    };
  }

  componentDidCatch(error, ignored) {
    this.setState({ caughtError: error });
    // TODO: bugsnag
  }

  render() {
    const { caughtError } = this.state;

    if (caughtError) {
      return <FormattedMessage {...messages.navbarError} />;
    }

    return <NavBarContent {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    actorType: getCurrentUserType(state),
    orgColor: getSideBarColor(state),
    redirectUrl: window.location.href,
  };
}

export default connect(mapStateToProps)(NavbarContainer);
