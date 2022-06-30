import { frontendIRIStr } from '../ontology/app';

export const frontendPathname = new URL(frontendIRIStr).pathname;
export const frontendOrigin = new URL(frontendIRIStr).origin;
