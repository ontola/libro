import rdf from '@ontologies/core';
import schema from '@ontologies/schema';

import { NS } from './LinkedRenderStore';

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
      return NS.fa4('file-pdf-o');
    case 'text/plain':
      return NS.fa4('file-text-o');
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    case 'application/vnd.oasis.opendocument.text':
      return NS.fa4('file-word-o');
    case 'application/zip':
      return NS.fa4('file-archive-o');
    case 'application/excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'application/vnd.oasis.opendocument.spreadsheet':
    case 'text/comma-separated-values':
    case 'text/csv':
      return NS.fa4('file-excel-o');
    case 'application/vnd.oasis.opendocument.presentation application/powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    case 'application/vnd.openxmlformats-officedocument.presentationml.slideshow':
      return NS.fa4('file-powerpoint-o');
    default:
      return NS.fa4('file-o');
  }
}
