import parser from 'uri-template';

import { NS } from '../../helpers/LinkedRenderStore';

export const searchIri = (iriTemplate, q, page, members = false) => {
  const tmpl = parser.parse(iriTemplate);

  return NS.app(tmpl.expand({
    fragment: members ? 'members' : null,
    page,
    q,
  }));
};
