import PropTypes from 'prop-types';
import React from 'react';
import * as ReactDOM from 'react-dom';

import './OverlayContainer.scss';

/**
 * Render content in an openlayers overlay.
 * Due to their mouse handling implementation, clicks get fucked up, see the issue for more info
 * https://github.com/openlayers/openlayers/issues/6948
 * @flaky
 */
class OverlayContainer extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    clickHandler: PropTypes.func,
    overlayRef: PropTypes.shape({
      current: PropTypes.instanceOf(Element),
    }),
  };

  render() {
    if (!this.props.overlayRef) {
      return null;
    }

    const convertToClick = (e) => {
      e.persist();
      e.preventDefault();
      e.stopPropagation();
      this.props.clickHandler(e);
    };

    return ReactDOM.createPortal(
      (
        <div className="OverlayContainer">
          <div className="click-ignore" onMouseUp={convertToClick}>
            {this.props.children}
          </div>
        </div>
      ),
      this.props.overlayRef
    );
  }
}

export default OverlayContainer;
