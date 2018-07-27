import { LinkedResourceContainer, linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCurrentLocation, getCurrentPopup } from '../../state/popup/selectors';
import { NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  location: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  popup: linkType,
};

class LinkedPopup extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
    };
  }

  render() {
    if (this.state.show || !this.props.popup) {
      return null;
    }

    const {
      bottom, left,
    } = this.props.location;

    return (
      <div
        style={{
          left,
          position: 'absolute',
          top: bottom,
        }}
      >
        <LinkedResourceContainer subject={this.props.popup} topology={NS.argu('popup')} />
      </div>
    );
  }
}

LinkedPopup.propTypes = propTypes;
LinkedPopup.stateTypes = {
  show: PropTypes.boolean,
};

const LinkedPopupConnect = connect(
  state => ({
    location: getCurrentLocation(state),
    popup: getCurrentPopup(state),
  }),
  null
)(LinkedPopup);

LinkedPopupConnect.propTypes = propTypes;

export default LinkedPopupConnect;
