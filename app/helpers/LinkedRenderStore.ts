import generateLRS from './generateLRS';
import patchRequestInitGenerator from './monkey';

export const {
  serviceWorkerCommunicator,
  /** @deprecated use the hook or hoc instead. */
  LRS,
} = generateLRS();

patchRequestInitGenerator(LRS);

export default LRS;
