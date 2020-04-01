import { createNS } from '@ontologies/core';

import { frontendIRIStr } from '../middleware/app';

const appSlashless = createNS(frontendIRIStr.slice(0, frontendIRIStr.endsWith('/') ? -1 : undefined));

export default {
  ns: appSlashless,
};
