import rdf from '@ontologies/core';
import parser from 'uri-template';

export const searchIri = (iriTemplate, q, page, members = false) => {
  const tmpl = parser.parse(iriTemplate);

  return rdf.namedNode(tmpl.expand({
    fragment: members ? 'members' : null,
    page,
    q,
  }));
};
