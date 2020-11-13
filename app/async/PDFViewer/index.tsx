import React from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faSpinner,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { withRouter, RouteComponentProps } from "react-router";
import { getParams, usePersistedState } from './helpers';
import { HotKeys } from "react-hotkeys";
import { keyMap } from './keyMap';
import { Property } from "link-redux";
import schema from '@ontologies/schema';

// eslint-disable-next-line
const { Document, Page, pdfjs } = require("react-pdf");
// tslint:disable-next-line:max-line-length
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export interface PDFViewerProps {
  url: string;
}

export interface PDFViewerState {
  numPages: null | number;
  pageNumber: number;
  // Should equal 70vw on desktops, 100vw on mobile
  maxWidth: number;
  wordhoardIDs: string[];
}

interface OnLoadSuccessType {
  numPages: number;
}

const MARGIN_LEFT = 200;

const calcMaxWidth = (windowWidth: number) => {
  if (windowWidth > 800) {
    return windowWidth - MARGIN_LEFT;
  }

  return windowWidth;
};

export const LoadingComponent = () =>
  <div className="PDFViewer__loading">
    <FontAwesomeIcon icon={faSpinner} size="6x" spin />
  </div>;

const PDFViewer = (props: PDFViewerProps & RouteComponentProps) => {
  const [pageNumber, setPageNumber] = React.useState<number>(0);
  const [docRef, setDocRef] = React.useState<any>(null);
  const [numPages, setNumPages] = React.useState<number>(0);
  const [maxWidth] = React.useState<number>(calcMaxWidth(window.innerWidth));
  const [showButtons, setShowButtons] = React.useState<boolean>(false);
  const drawer = {
    width: 500,
    setWidth: (_width: any) => null,
  }
  const pdfWrapper = React.createRef<HTMLInputElement>();

  const handlePreviousPage = () => {
    if (pageNumber === 1) {
      return;
    }
    setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    if (numPages === pageNumber) {
      return;
    }
    setPageNumber(pageNumber + 1);
  };

  const onDocumentLoadSuccess = (e: OnLoadSuccessType) => {
    setNumPages(e.numPages);
    setPageNumber(1);
    setShowButtons(true);
  };

  const PDFErrorComponent = (error: any) => {
    return (
      <div className="PDFViewer__error">
        <p>
          De PDF kan niet worden geladen.
        </p>
        <a href={props.url} download >Download het bestand.</a>
        {/* If the PDF does not render, show the plaintext */}
        <Property label={schema.text} />
        {/*<Property label={NS.schema("text")} />*/}
      </div>
    );
  };

  const setFillWidth = () => {
    if (docRef !== null) {
      const docRatio = docRef.clientWidth / docRef.clientHeight;
      const newWidth = window.innerHeight * docRatio;
      if (newWidth < maxWidth) {
        drawer.setWidth(newWidth);
      } else {
        drawer.setWidth(maxWidth);
      }
      setTimeout(
        () => docRef.scrollIntoView({
                                      behavior: "smooth",
                                      block: "start",
                                    }),
        100,
      );
    }
  };

  const keyHandlers = {
    PREVIOUS: handlePreviousPage,
    NEXT: handleNextPage,
    FULLSCREEN: setFillWidth,
  };

  return (
    <HotKeys
      allowChanges={true}
      keyMap={keyMap}
      handlers={keyHandlers}
      ref={() => pdfWrapper}
    >
      <div className="PDFViewer" id="PDFViewer">
        <div className="PDFViewer__scroller">
          {/* This component catches focus on Opening and deals with keys */}
          <div
            id="pdfWrapper"
            tabIndex={-1}
            style={{ width: "100%" }}
            ref={pdfWrapper}
          >
            <Document
              error={<PDFErrorComponent/>}
              file={props.url}
              loading={<LoadingComponent/>}
              inputRef={(ref: any) => { setDocRef(ref); }}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page
                loading={<LoadingComponent/>}
                error={<PDFErrorComponent/>}
                pageIndex={pageNumber - 1}
                width={drawer.width}
              />
            </Document>
          </div>
        </div>
        {showButtons &&
        <div className="PDFViewer__button-bar">
          <div className="PDFViewer__button-bar-inner">
            <Button
              onClick={handlePreviousPage}
              disabled={(pageNumber === 1)}
              title="Vorige pagina (←)"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
            <span>{`${pageNumber} / ${numPages}`}</span>
            <Button
              onClick={handleNextPage}
              disabled={(pageNumber === (numPages))}
              title="Volgende pagina (→)"
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
            <Button
              onClick={() => window.open(props.url)}
              title="Download bestand (D)"
            >
              <FontAwesomeIcon icon={faDownload} />
            </Button>
            {/* <Button
              onClick={setFillWidth}
              title="Scherm vullen (F)"
            >
              <FontAwesomeIcon icon={faExpand} />
            </Button> */}
          </div>
        </div>
        }
      </div>
    </HotKeys>
  );
};

export default withRouter(PDFViewer);
