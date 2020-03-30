import rdf from '@ontologies/core';
import parser from 'uri-template';

export const iriFromTemplate = (iriTemplate: string, q: string, page: string, members = false) => {
  const tmpl = parser.parse(iriTemplate);

  return rdf.namedNode(tmpl.expand({
    fragment: members ? 'members' : null,
    page,
    q,
  }));
};
