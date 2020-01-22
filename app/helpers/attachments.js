import rdf from '@ontologies/core';
import schema from '@ontologies/schema';

import fa4 from '../ontology/fa4';

export function downloadableAttachment({ contentUrl, type }) {
  return rdf.equals(type, schema.VideoObject) || !contentUrl;
}

export function downloadUrl(contentUrl) {
  const downloadLink = new URL(contentUrl.value);
  downloadLink.searchParams.set('download', 'true');

  return downloadLink.toString();
}

export function imageRepresentationUrl({ encodingFormat }) {
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
