import rdf from '@ontologies/core';
import parser from 'uri-template';

export const iriFromTemplate = (iriTemplate: string, iriOpts: object) => {
  const tmpl = parser.parse(iriTemplate);

  return rdf.namedNode(tmpl.expand(iriOpts));
};
