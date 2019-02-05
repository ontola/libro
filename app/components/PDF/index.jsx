import PropTypes from 'prop-types';
import React from 'react';
import { HotKeys } from 'react-hotkeys';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { absoluteRouterLocation } from '../../helpers/paths';
import { frontendOrigin } from '../../middleware/app';
import { setNumPages, setRotation, setZoomLevel } from '../../state/PDFViewer/actions';
import {
  getNumPages,
  getRotation,
  getShowComments,
  getZoomlevel,
} from '../../state/PDFViewer/selectors';

import PDFComments from './PDFComments';
import PDFNav from './PDFNav';

import './PDF.scss';

const propTypes = {
  currentPage: PropTypes.number.isRequired,
  /* URL to the PDF file */
  file: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.string.isRequired,
  navigate: PropTypes.func,
  numPages: PropTypes.number,
  onDocumentLoadSuccess: PropTypes.func.isRequired,
  onSetRotation: PropTypes.func.isRequired,
  onSetZoomLevel: PropTypes.func.isRequired,
  rotationLevel: PropTypes.number.isRequired,
  showComments: PropTypes.bool.isRequired,
  zoomLevel: PropTypes.number.isRequired,
};

const ZOOM_RATIO = 1.2;

class PDFViewer extends React.Component {
  constructor() {
    super();
    this.state = {
      Document: undefined,
      Page: undefined,
    };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleRotate = this.handleRotate.bind(this);
    this.handleSetPage = this.handleSetPage.bind(this);
  }

  async componentDidMount() {
    // eslint-disable-next-line no-inline-comments
    const { Document, Page } = await import(/* webpackChunkName: 'PDF' */'react-pdf/dist/entry.webpack');

    this.setState({
      Document,
      Page,
    });
  }

  componentDidUpdate(props) {
    if (this.props.currentPage !== props.currentPage) {
      this.resetScrollPosition();
    }
  }

  getCurrentPage() {
    const pageParam = new URL(this.props.location, frontendOrigin).searchParams.get('page');

    let currentPage = 1;
    const paramPage = parseInt(pageParam, 10);
    if (!Number.isNaN(paramPage)) {
      currentPage = paramPage;
    }

    return currentPage;
  }

  resetScrollPosition() {
    this.scrollViewElement.scrollTop = 0;
    this.scrollViewElement.scrollLeft = 0;
  }

  handleItemClick(event) {
    if (event.pageNumber) {
      this.handleSetPage(event.pageNumber);
    }
  }

  handleRotate() {
    const rotateFactor = 90;
    const rotateMax = 359;
    let newRotation = this.props.rotationLevel + rotateFactor;
    if (newRotation > rotateMax) {
      newRotation = 0;
    }
    this.props.onSetRotation(newRotation);
  }

  handleSetPage(requestedNumber) {
    const { location, numPages } = this.props;
    let numberOutput = 1;
    if (requestedNumber > numberOutput) {
      numberOutput = requestedNumber;
    }
    if (requestedNumber > numPages) {
      numberOutput = numPages;
    }

    const next = new URL(location, frontendOrigin);
    next.searchParams.set('page', numberOutput);

    this.props.navigate(next.toString().replace(next.origin, ''));
  }

  renderRich() {
    const { Document, Page } = this.state;

    if (!Document || !Page) {
      return <div>Loading...</div>;
    }

    const {
      file,
      onDocumentLoadSuccess,
      rotationLevel,
      zoomLevel,
    } = this.props;

    return (
      <Document
        externalLinkTarget="_blank"
        file={file}
        rotate={rotationLevel}
        onItemClick={this.handleItemClick}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          pageNumber={this.getCurrentPage()}
          // The text layer allows for text selection,
          // but it's currently (4.0.0) a bit buggy
          renderMode="html"
          scale={zoomLevel}
        />
      </Document>
    );
  }

  render() {
    const {
      file,
      onSetZoomLevel,
      rotationLevel,
      showComments,
      zoomLevel,
    } = this.props;

    const currentPage = this.getCurrentPage();

    const handlers = {
      next: () => this.handleSetPage(currentPage + 1),
      previous: () => this.handleSetPage(currentPage - 1),
      rotate: () => this.handleRotate(),
      zoomIn: () => onSetZoomLevel(zoomLevel * ZOOM_RATIO),
      zoomOut: () => onSetZoomLevel(zoomLevel / ZOOM_RATIO),
      zoomReset: () => onSetZoomLevel(1),
    };

    return (
      <React.Fragment>
        <PDFNav
          currentPage={currentPage}
          file={file}
          numPages={this.props.numPages}
          onRotate={this.handleRotate}
          onSetPage={this.handleSetPage}
        />
        <HotKeys
          focused
          attach={window}
          handlers={handlers}
          tabIndex={0}
        >
          <div
            className="PDFViewer__scroll-box"
            ref={(node) => { this.scrollViewElement = node; }}
          >
            <div className="PDFViewer__wrapper">
              {showComments && (
                <PDFComments
                  currentPage={currentPage}
                  rotate={rotationLevel}
                  scale={zoomLevel}
                />
              )}
              {this.renderRich()}
            </div>
          </div>
        </HotKeys>
      </React.Fragment>
    );
  }
}

PDFViewer.propTypes = propTypes;

const MapStateToProps = (state, ownProps) => ({
  location: absoluteRouterLocation(state),
  numPages: getNumPages(state, ownProps.file),
  rotationLevel: getRotation(state, ownProps.file),
  showComments: getShowComments(state),
  zoomLevel: getZoomlevel(state),
});

const MapDispatchToProps = (dispatch, ownProps) => ({
  navigate: url => ownProps.history.push(url),
  onDocumentLoadSuccess: success => dispatch(setNumPages({
    id: ownProps.file,
    numPages: success.numPages,
  })),
  onSetRotation: rotationLevel => dispatch(setRotation({
    id: ownProps.file,
    rotation: rotationLevel,
  })),
  onSetZoomLevel: zoomLevel => dispatch(setZoomLevel(zoomLevel)),
});

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withRouter(PDFViewer));
