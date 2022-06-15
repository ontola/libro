import { Literal, NamedNode } from '@ontologies/core';
import { filenameStr } from '@rdfdev/iri';

import fa4 from '../../../ontology/fa4';

export function downloadUrl(contentUrl: NamedNode): string {
  const downloadLink = new URL(contentUrl.value);
  downloadLink.searchParams.set('download', 'true');

  return downloadLink.toString();
}

export function imageRepresentationUrl({ encodingFormat }: { encodingFormat?: Literal }): NamedNode {
  switch (encodingFormat && encodingFormat.value) {
  case 'application/zip':
    return fa4.ns('file-archive-o');
  case 'application/pdf':
    return fa4.ns('file-text');
  default:
    return fa4.ns('file');
  }
}

export function isPDF(encodingFormat: Literal, contentUrl: NamedNode): boolean {
  return encodingFormat?.value === 'application/pdf'
    || contentUrl?.value.includes('api.openraadsinformatie.nl');
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

export const isCSV = (url: string, mime: string | undefined): boolean =>
  filenameStr(url).split('.').pop() === 'csv'
    || csvTypes.some((it) => mime?.includes(it));

export const isXLS = (url: string, mime: string | undefined): boolean =>
  xlsExts.includes(filenameStr(url).split('.').pop() ?? '') ||
  xlsTypes.some((it) => mime?.includes(it));

export function isSheet(url: string, encodingFormat: Literal): boolean {
  return isCSV(url, encodingFormat.value) || isXLS(url, encodingFormat.value);
}
