import { createNS } from '@ontologies/core';
import { frontendIRIStr } from '../middleware/app';

const app = createNS(frontendIRIStr.endsWith('/') ? frontendIRIStr : `${frontendIRIStr}/`);

export default {
  ns: app,
};
