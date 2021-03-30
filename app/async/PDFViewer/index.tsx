import IconButton from '@material-ui/core/IconButton';
import * as schema from '@ontologies/schema';
import { Property } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { HotKeys } from 'react-hotkeys';
import { useIntl } from 'react-intl';
import {
  Document,
  Page,
  pdfjs,
} from 'react-pdf';

import { PDFViewerProps } from '../../containers/PDFViewer';
import { pdfMessages } from '../../translations/messages';

import { keyMap } from './keyMap';
import PDFLoader from './PDFLoader';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


interface OnLoadSuccessType {
  numPages: number;
}

const MARGIN_LEFT = 200;
const MAX_WINDOW_WIDTH = 800;

const calcMaxWidth = (windowWidth: number) => {
  if (windowWidth > MAX_WINDOW_WIDTH) {
    return windowWidth - MARGIN_LEFT;
  }

  return windowWidth;
};

const PDFViewer = (props: PDFViewerProps): JSX.Element => {
  const intl = useIntl();
  const [pageNumber, setPageNumber] = React.useState(1);
  const [docRef, setDocRef] = React.useState<any>(null);
  const [numPages, setNumPages] = React.useState<number>(0);
  const [maxWidth] = React.useState<number>(calcMaxWidth(window.innerWidth));
  const [showButtons, setShowButtons] = React.useState<boolean>(false);
  const drawer = {
    setWidth: (() => null) as (props: any) => any,
    width: 500,
  };
  const pdfWrapper = React.createRef<HTMLInputElement>();

  const handlePreviousPage = React.useCallback(() => {
    if (pageNumber === 1) {
      return;
    }
    setPageNumber(pageNumber - 1);
  }, [pageNumber, setPageNumber]);

  const handleNextPage = React.useCallback(() => {
    if (numPages === pageNumber) {
      return;
    }
    setPageNumber(pageNumber + 1);
  }, [pageNumber, setPageNumber]);

  const onDocumentLoadSuccess = React.useCallback((e: OnLoadSuccessType) => {
    setNumPages(e.numPages);
    setPageNumber(1);
    setShowButtons(true);
  }, [setNumPages, setPageNumber, setShowButtons]);

  const setFillWidth = React.useCallback(() => {
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
          behavior: 'smooth',
          block: 'start',
        }),
        100,
      );
    }
  }, [docRef, maxWidth]);

  const PDFErrorComponent = React.useCallback(() => (
    <div className="PDFViewer__error">
      <p>
        De PDF kan niet worden geladen.
      </p>
      <a download href={props.url}>Download het bestand.</a>
      {/* If the PDF does not render, show the plaintext */}
      <Property label={schema.text} />
    </div>
  ), [props.url]);

  const keyHandlers = React.useMemo(() => ({
    FULLSCREEN: setFillWidth,
    NEXT: handleNextPage,
    PREVIOUS: handlePreviousPage,
  }), [setFillWidth, handleNextPage, handlePreviousPage]);

  return (
    <HotKeys
      allowChanges
      handlers={keyHandlers}
      keyMap={keyMap}
      ref={() => pdfWrapper}
    >
      <div className="PDFViewer" id="PDFViewer">
        <div className="PDFViewer__scroller">
          {/* This component catches focus on Opening and deals with keys */}
          <div
            id="pdfWrapper"
            ref={pdfWrapper}
            style={{
              cursor: 'auto',
              position: 'relative',
              width: drawer.width,
            }}
            tabIndex={-1}
          >
            <Document
              error={<PDFErrorComponent />}
              file={props.url}
              inputRef={(ref: any) => { setDocRef(ref); }}
              loading={<PDFLoader />}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page
                error={<PDFErrorComponent />}
                loading={<PDFLoader />}
                pageIndex={pageNumber - 1}
                width={drawer.width}
              />
            </Document>
          </div>
        </div>
        {showButtons && (
          <div className="PDFViewer__button-bar">
            <div
              className="PDFViewer__button-bar-inner"
              style={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <IconButton
                disabled={pageNumber === 1}
                size="small"
                title={intl.formatMessage(pdfMessages.previousPage)}
                onClick={handlePreviousPage}
              >
                <FontAwesome name="arrow-left" />
              </IconButton>
              <span>{`${pageNumber} / ${numPages}`}</span>
              <IconButton
                disabled={(pageNumber === (numPages))}
                size="small"
                title={intl.formatMessage(pdfMessages.nextPage)}
                onClick={handleNextPage}
              >
                <FontAwesome name="arrow-right" />
              </IconButton>
              <IconButton
                size="small"
                title={intl.formatMessage(pdfMessages.download)}
                onClick={() => window.open(props.url)}
              >
                <FontAwesome name="download" />
              </IconButton>
              <IconButton
                size="small"
                title={intl.formatMessage(pdfMessages.fullScreen)}
                onClick={setFillWidth}
              >
                <FontAwesome name="expand" />
              </IconButton>
            </div>
          </div>
        )}
      </div>
    </HotKeys>
  );
};

export default PDFViewer;
