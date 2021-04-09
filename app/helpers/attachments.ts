import { Literal, NamedNode } from '@ontologies/core';

import fa4 from '../ontology/fa4';

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

export function isPDF(encodingFormat: Literal): boolean {
  return encodingFormat?.value === 'application/pdf';
}
