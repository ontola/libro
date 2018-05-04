import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { setPopupResource, unsetPopupResource } from '../../state/popup/actions';

const propTypes = {
  children: PropTypes.node.isRequired,
  setPopup: PropTypes.func,
  /** The subject to render in the popup */
  subject: linkType,
  unsetPopup: PropTypes.func,
};

class HoverPopup extends PureComponent {
  constructor() {
    super();

    this.displayPopup = this.displayPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
  }

  displayPopup() {
    this.props.setPopup(
      this.props.subject,
      this.hoverElem.getBoundingClientRect()
    );
  }

  hidePopup() {
    this.props.unsetPopup(this.props.subject);
  }

  render() {
    return (
      <span
        data-test="LinkedPopup-trigger"
        ref={(elem) => { this.hoverElem = elem; }}
        tabIndex="0"
        onBlur={this.hidePopup}
        onFocus={this.displayPopup}
        onMouseEnter={this.displayPopup}
        onMouseLeave={this.hidePopup}
      >
        {this.props.children}
      </span>
    );
  }
}

HoverPopup.propTypes = propTypes;

const HoverPopupConnect = connect(
  null,
  dispatch => ({
    setPopup: (subject, location) => dispatch(setPopupResource(subject, location)),
    unsetPopup: subject => dispatch(unsetPopupResource(subject)),
  }),
  null
)(HoverPopup);

HoverPopupConnect.propTypes = propTypes;

export default HoverPopupConnect;
