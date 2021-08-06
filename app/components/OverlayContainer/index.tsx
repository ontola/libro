import PropTypes from 'prop-types';
import React, { MouseEvent, MouseEventHandler } from 'react';
import * as ReactDOM from 'react-dom';

import './OverlayContainer.scss';

interface PropTypes {
  clickHandler: MouseEventHandler;
  overlayRef: HTMLElement | null;
}

/**
 * Render content in an openlayers overlay.
 * Due to their mouse handling implementation, clicks get fucked up, see the issue for more info
 * https://github.com/openlayers/openlayers/issues/6948
 * @flaky
 */
class OverlayContainer extends React.PureComponent<PropTypes> {
  public render() {
    if (!this.props.overlayRef) {
      return null;
    }

    const convertToClick = (e: MouseEvent<HTMLDivElement>) => {
      e.persist();
      e.preventDefault();
      e.stopPropagation();
      this.props.clickHandler(e);
    };

    return ReactDOM.createPortal(
      (
        <div className="OverlayContainer">
          <div
            className="click-ignore"
            onMouseUp={convertToClick}
          >
            {this.props.children}
          </div>
        </div>
      ),
      this.props.overlayRef,
    );
  }
}

export default OverlayContainer;
