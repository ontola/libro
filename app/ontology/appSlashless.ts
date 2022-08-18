import { createNS } from '@ontologies/core';

import { frontendIRIStr } from '../modules/Kernel/lib/frontendIRIComponents';
import { removeTrailingSlash } from '../modules/Kernel/lib/id';

const appSlashless = createNS(removeTrailingSlash(frontendIRIStr));

export default {
  ns: appSlashless,
};
