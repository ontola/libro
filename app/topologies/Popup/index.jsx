import { LinkedResourceContainer, linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { getCurrentLocation, getCurrentPopup } from '../../state/popup/selectors';
import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

export const popupTopology = NS.argu('popup');

class Popup extends Topology {
  static propTypes = {
    location: PropTypes.shape({
      bottom: PropTypes.number,
      left: PropTypes.number,
    }),
    popup: linkType,
  };

  static stateTypes = {
    show: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
    this.topology = popupTopology;
  }

  render() {
    if (this.state.show || !this.props.popup) {
      return null;
    }

    const {
      bottom, left,
    } = this.props.location;

    return this.wrap((
      <div
        style={{
          left,
          position: 'absolute',
          top: bottom,
        }}
      >
        <LinkedResourceContainer subject={this.props.popup} topology={NS.argu('popup')} />
      </div>
    ));
  }
}

const ConnectedPopup = connect(
  state => ({
    location: getCurrentLocation(state),
    popup: getCurrentPopup(state),
  }),
  null
)(Popup);

export default ConnectedPopup;
