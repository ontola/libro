import parser from 'uri-template';

import app from '../../ontology/app';

export const searchIri = (iriTemplate, q, page, members = false) => {
  const tmpl = parser.parse(iriTemplate);

  return app.ns(tmpl.expand({
    fragment: members ? 'members' : null,
    page,
    q,
  }));
};
