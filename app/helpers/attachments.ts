import { Literal, NamedNode } from '@ontologies/core';

import fa4 from '../ontology/fa4';

export function downloadUrl(contentUrl: NamedNode) {
  const downloadLink = new URL(contentUrl.value);
  downloadLink.searchParams.set('download', 'true');

  return downloadLink.toString();
}

export function imageRepresentationUrl({ encodingFormat }: { encodingFormat?: Literal }) {
  switch (encodingFormat && encodingFormat.value) {
    case 'application/pdf':
      return fa4.ns('file-pdf-o');
    case 'text/plain':
      return fa4.ns('file-text-o');
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    case 'application/vnd.oasis.opendocument.text':
      return fa4.ns('file-word-o');
    case 'application/zip':
      return fa4.ns('file-archive-o');
    case 'application/excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'application/vnd.oasis.opendocument.spreadsheet':
    case 'text/comma-separated-values':
    case 'text/csv':
      return fa4.ns('file-excel-o');
    case 'application/vnd.oasis.opendocument.presentation application/powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    case 'application/vnd.openxmlformats-officedocument.presentationml.slideshow':
      return fa4.ns('file-powerpoint-o');
    default:
      return fa4.ns('file-o');
  }
}

export function isPDF(encodingFormat: Literal) {
  return encodingFormat?.value === 'application/pdf';
}
