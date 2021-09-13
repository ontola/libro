import rdf, { NamedNode } from '@ontologies/core';
import parser from 'uri-template';

import app from '../ontology/app';

export const iriFromTemplate = (iriTemplate: string, iriOpts: Record<string, unknown>): NamedNode => {
  const tmpl = parser.parse(iriTemplate);
  const expanded = tmpl.expand(iriOpts);

  return expanded.startsWith('/') ? app.ns(expanded.substring(1)) : rdf.namedNode(expanded);
};
