import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  setShowComments,
  setZoomLevel,
} from '../../state/PDFViewer/actions';
import {
  getNumPages,
  getShowComments,
  getZoomlevel,
} from '../../state/PDFViewer/selectors';
import Button from '../Button';

const propTypes = {
  currentPage: PropTypes.number.isRequired,
  currentZoomLevel: PropTypes.number.isRequired,
  numPages: PropTypes.number,
  onRotate: PropTypes.func.isRequired,
  onSetPage: PropTypes.func.isRequired,
  onSetZoomLevel: PropTypes.func.isRequired,
  onShowComments: PropTypes.func.isRequired,
  showComments: PropTypes.bool.isRequired,
};

const defaultProps = {
  numPages: undefined,
};

const ZOOM_RATIO = 1.2;

class PDFNav extends React.PureComponent {
  render() {
    const {
      currentPage,
      currentZoomLevel,
      numPages,
      onSetPage,
      onSetZoomLevel,
      onRotate,
      onShowComments,
      showComments,
    } = this.props;

    return (
      <div className="PDFNav__container">
        <div className="PDFNav">
          <Button
            small
            disabled={(currentPage === 1)}
            icon="arrow-left"
            theme="transparant"
            title="Vorige pagina"
            onClick={() => onSetPage(currentPage - 1)}
          />
          <input
            className="PDFNav__page-input"
            title="Selecteer pagina"
            value={currentPage}
            onChange={e => onSetPage(parseInt(e.target.value, 10))}
            onClick={() => document.execCommand('selectall', null, false)}
          />
          {numPages && (
            <span className="PDFNav__page-total-pages">/ {numPages}</span>
          )}
          <Button
            small
            disabled={(currentPage === numPages)}
            icon="arrow-right"
            theme="transparant"
            title="Volgende pagina"
            onClick={() => onSetPage(currentPage + 1)}
          />
          <Button
            small
            icon="search-minus"
            theme="transparant"
            title="Uitzoomen"
            onClick={() => onSetZoomLevel(currentZoomLevel / ZOOM_RATIO)}
          />
          <Button
            small
            icon="search-plus"
            theme="transparant"
            title="Inzoomen"
            onClick={() => onSetZoomLevel(currentZoomLevel * ZOOM_RATIO)}
          />
          <Button
            small
            icon="rotate-right"
            theme="transparant"
            title="Draaien"
            onClick={onRotate}
          />
          {showComments && (
            <Button
              small
              icon="eye-slash"
              theme="transparant"
              title="Reacties verbergen"
              onClick={() => onShowComments(false)}
            />
          )}
          {!showComments && (
            <Button
              small
              icon="comment"
              theme="transparant"
              title="Reacties tonen"
              onClick={() => onShowComments(true)}
            />
          )}
        </div>
      </div>
    );
  }
}

PDFNav.propTypes = propTypes;
PDFNav.defaultProps = defaultProps;

const MapStateToProps = (state, ownProps) => ({
  currentZoomLevel: getZoomlevel(state),
  numPages: getNumPages(state, ownProps.file),
  showComments: getShowComments(state, ownProps.file),
});

const MapDispatchToProps = dispatch => ({
  onSetZoomLevel: zoomLevel => dispatch(setZoomLevel(zoomLevel)),
  onShowComments: show => dispatch(setShowComments(show)),
});

export default withRouter(connect(
  MapStateToProps,
  MapDispatchToProps
)(PDFNav));
