import IconButton from '@material-ui/core/IconButton';
import * as schema from '@ontologies/schema';
import {
  Property,
  SubjectType,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { HotKeys } from 'react-hotkeys';
import { defineMessages, useIntl } from 'react-intl';
import { Document, Page, pdfjs } from 'react-pdf';

import { keyMap } from './keyMap';
import PDFLoader from './PDFLoader';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export interface PDFViewerProps {
  url: string;
  subject: SubjectType;
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

const messages = defineMessages({
  download: {
    defaultMessage: 'Download file (D)',
    id: 'https://app.argu.co/i18n/pdf/download',
  },
  fullScreen: {
    defaultMessage: 'Fullscreen (F)',
    id: 'https://app.argu.co/i18n/pdf/fullScreen',
  },
  nextPage: {
    defaultMessage: 'Next page (→)',
    id: 'https://app.argu.co/i18n/pdf/nextPage',
  },
  previousPage: {
    defaultMessage: 'Previous page (←)',
    id: 'https://app.argu.co/i18n/pdf/previousPage',
  },
});

const PDFViewer = (props: PDFViewerProps) => {
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
      <a href={props.url} download >Download het bestand.</a>
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
            style={{
              cursor: 'auto',
              position: 'relative',
              width: drawer.width,
            }}
            ref={pdfWrapper}
          >
            <Document
              error={<PDFErrorComponent />}
              file={props.url}
              loading={<PDFLoader />}
              inputRef={(ref: any) => { setDocRef(ref); }}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page
                loading={<PDFLoader />}
                error={<PDFErrorComponent />}
                pageIndex={pageNumber - 1}
                width={drawer.width}
              />
            </Document>
          </div>
        </div>
        {showButtons &&
          <div className="PDFViewer__button-bar">
            <div className="PDFViewer__button-bar-inner"
              style={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <IconButton
                onClick={handlePreviousPage}
                disabled={pageNumber === 1}
                title={intl.formatMessage(messages.previousPage)}
                size="small"
              >
                <FontAwesome name="arrow-left" />
              </IconButton>
              <span>{`${pageNumber} / ${numPages}`}</span>
              <IconButton
                onClick={handleNextPage}
                disabled={(pageNumber === (numPages))}
                size="small"
                title={intl.formatMessage(messages.nextPage)}
              >
                <FontAwesome name="arrow-right" />
              </IconButton>
              <IconButton
                onClick={() => window.open(props.url)}
                size="small"
                title={intl.formatMessage(messages.download)}
              >
                <FontAwesome name="download" />
              </IconButton>
              <IconButton
                onClick={setFillWidth}
                size="small"
                title={intl.formatMessage(messages.fullScreen)}
              >
                <FontAwesome name="expand" />
              </IconButton>
            </div>
          </div>
        }
      </div>
    </HotKeys>
  );
};

export default PDFViewer;
