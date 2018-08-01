import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { BlurButton } from '../../components';
import SideBarLinkIcon from '../../components/SideBarLink/SideBarLinkIcon';
import SideBarLinkLabel from '../../components/SideBarLink/SideBarLinkLabel';

import ErrorButtonWithFeedback from './ErrorButtonWithFeedback';
import { titleForStatus, errors } from './ErrorMessages';

const propTypes = {
  linkRequestStatus: PropTypes.shape({
    status: PropTypes.number,
  }),
  location: PropTypes.string,
  reloadLinkedObject: PropTypes.func.isRequired,
};

class ErrorButtonSideBar extends ErrorButtonWithFeedback {
  render() {
    const { linkRequestStatus } = this.props;

    return (

      <BlurButton
        className="SideBarLink"
        style={{
          cursor: 'pointer',
        }}
        title={`${titleForStatus(linkRequestStatus)} ${errors.nl.click_to_retry}`}
        onClick={this.reload}
      >
        <SideBarLinkIcon>
          <FontAwesome
            name={this.state.loading ? 'spinner' : 'exclamation-triangle'}
            spin={this.state.loading}
          />
        </SideBarLinkIcon>
        <SideBarLinkLabel>
          {errors.nl.error}
        </SideBarLinkLabel>
      </BlurButton>
    );
  }
}

ErrorButtonSideBar.propTypes = propTypes;

export default ErrorButtonSideBar;
