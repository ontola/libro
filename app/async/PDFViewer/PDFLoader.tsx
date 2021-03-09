import React from 'react';
import FontAwesome from 'react-fontawesome';

const PDFLoader = (): JSX.Element => (
  <div className="PDFViewer__loading">
    <FontAwesome spin name="spinner" />
  </div>
);

export default PDFLoader;
