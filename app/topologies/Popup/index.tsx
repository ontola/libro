import { SomeNode } from 'link-lib';
import { Resource } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import argu from '../../ontology/argu';
import { PopupObject } from '../../state/popup/reducer';
import { getCurrentLocation, getCurrentPopup } from '../../state/popup/selectors';
import Topology, { TopologyState } from '../Topology';

export const popupTopology = argu.ns('popup');

interface Location {
  bottom: number;
  left: number;
}

interface PropTypes {
  location: Location;
  popup: SomeNode;
}

interface State extends TopologyState {
  show: boolean;
}

class Popup extends Topology<PropTypes, State> {
  public static stateTypes = {
    show: PropTypes.bool,
  };

  constructor(props: PropTypes) {
    super(props);

    this.state = {
      show: false,
    };
    this.topology = popupTopology;
  }

  public render() {
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
        <Resource subject={this.props.popup} topology={popupTopology} />
      </div>
    ));
  }
}

const ConnectedPopup = connect(
  (state: Record<string, PopupObject>) => ({
    location: getCurrentLocation(state),
    popup: getCurrentPopup(state),
  }),
  null,
)(Popup);

export default ConnectedPopup as unknown as React.ComponentType;
