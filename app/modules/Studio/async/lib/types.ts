import { Node, Quad } from '@ontologies/core';

export type ToDataObject = (
  id: Node,
  data: Quad[],
  websiteIRI: string,
  indentation?: number,
) => string | undefined;
