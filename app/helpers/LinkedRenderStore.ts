import generateLRS from './generateLRS';
import patchRequestInitGenerator from './monkey';

export const {
  serviceWorkerCommunicator,
  /** @deprecated use the hook or hoc instead. */
  LRS,
  NS,
} = generateLRS();

patchRequestInitGenerator(LRS);

export default LRS;
