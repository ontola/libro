import generateLRS from './generateLRS';
import patchRequestInitGenerator from './monkey';

export const {
  serviceWorkerCommunicator,
  LRS,
  NS,
} = generateLRS();

patchRequestInitGenerator(LRS);

export default LRS;
