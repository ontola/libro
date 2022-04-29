import IconButton from '@mui/material/IconButton';
import * as schema from '@ontologies/schema';
import { Property, useLRS } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { useIntl } from 'react-intl';
import {
  Document,
  Page,
  pdfjs,
} from 'react-pdf';
import { useKey } from 'rooks';

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

const onKeyUp = () => null;

const PDFViewer = ({
  AdditionalButtons,
  Overlay,
  pageNumber,
  onClick,
  onPageNumberChange,
  url,
}: PDFViewerProps): JSX.Element => {
  const lrs = useLRS();
  const intl = useIntl();
  const [docRef, setDocRef] = React.useState<any>(null);
  const [numPages, setNumPages] = React.useState<number>(0);
  const [maxWidth] = React.useState<number>(calcMaxWidth(window.innerWidth));
  const [showButtons, setShowButtons] = React.useState<boolean>(false);
  const drawer = {
    setWidth: (() => null) as (props: any) => any,
    width: 500,
  };

  const wrappedOnClick = React.useCallback((e) => {
    if (onClick) {
      onClick(e, docRef);
    }
  }, [docRef, onClick]);

  const handlePreviousPage = React.useCallback(() => {
    if (pageNumber === 1) {
      return;
    }

    onPageNumberChange(pageNumber - 1);
  }, [pageNumber, onPageNumberChange]);

  const handleNextPage = React.useCallback(() => {
    if (numPages === pageNumber) {
      return;
    }

    onPageNumberChange(pageNumber + 1);
  }, [pageNumber, onPageNumberChange]);

  const onDocumentLoadSuccess = React.useCallback((e: OnLoadSuccessType) => {
    setNumPages(e.numPages);
    onPageNumberChange(1);
    setShowButtons(true);
  }, [setNumPages, onPageNumberChange, setShowButtons]);

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
      <a
        download
        href={url}
      >
        Download het bestand.
      </a>
      {/* If the PDF does not render, show the plaintext */}
      <Property label={schema.text} />
    </div>
  ), [url]);

  const handleDownload = React.useCallback(
    () => lrs.actions.ontola.openWindow(url),
    [lrs, url],
  );

  useKey([keyMap.FULLSCREEN], setFillWidth);
  useKey([keyMap.NEXT], handleNextPage);
  useKey([keyMap.PREVIOUS], handlePreviousPage);

  return (
    <div
      className="PDFViewer"
      id="PDFViewer"
    >
      <div className="PDFViewer__scroller">
        {/* This component catches focus on Opening and deals with keys */}
        <div
          id="pdfWrapper"
          style={{
            cursor: 'auto',
            position: 'relative',
            width: drawer.width,
          }}
          tabIndex={-1}
          onClick={wrappedOnClick}
          onKeyUp={onKeyUp}
        >
          <Document
            error={<PDFErrorComponent />}
            file={url}
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
          {Overlay && <Overlay />}
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
            <span>
              {`${pageNumber} / ${numPages}`}
            </span>
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
              onClick={handleDownload}
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
            {AdditionalButtons && <AdditionalButtons />}
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
