import { NamedNode } from '@ontologies/core';
import { filenameStr } from '@rdfdev/iri';

import fa4 from '../ontology/fa4';

export function downloadUrl(contentUrl: string): string {
  const downloadLink = new URL(contentUrl);
  downloadLink.searchParams.set('download', 'true');

  return downloadLink.toString();
}

export function imageRepresentationUrl({ encodingFormat }: { encodingFormat?: string }): NamedNode {
  switch (encodingFormat) {
  case 'application/zip':
    return fa4.ns('file-archive-o');
  case 'application/pdf':
    return fa4.ns('file-text');
  default:
    return fa4.ns('file');
  }
}

export function isPDF(encodingFormat: string | undefined, contentUrl: string | undefined): boolean {
  return encodingFormat === 'application/pdf'
    || contentUrl?.includes('api.openraadsinformatie.nl')
    || false;
}

export const csvTypes = [
  'text/csv',
  'text/comma-separated-values',
];

export const xlsTypes = [
  'application/excel',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.oasis.opendocument.spreadsheet',
];

export const xlsExts = [
  'xls',
  'xlsx',
  'ods',
];

export const isCSV = (url: string | undefined, mime: string | undefined): boolean =>
  (url && filenameStr(url).split('.').pop() === 'csv')
    || csvTypes.some((it) => mime?.includes(it));

export const isXLS = (url: string | undefined, mime: string | undefined): boolean =>
  (url && xlsExts.includes(filenameStr(url).split('.').pop() ?? '')) ||
  xlsTypes.some((it) => mime?.includes(it));

export function isSheet(url: string | undefined, encodingFormat: string | undefined): boolean {
  return isCSV(url, encodingFormat) || isXLS(url, encodingFormat);
}
