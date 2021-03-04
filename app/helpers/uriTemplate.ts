import rdf, { NamedNode } from '@ontologies/core';
import parser from 'uri-template';

export const iriFromTemplate = (iriTemplate: string, iriOpts: Record<string, unknown>): NamedNode => {
  const tmpl = parser.parse(iriTemplate);

  return rdf.namedNode(tmpl.expand(iriOpts));
};
