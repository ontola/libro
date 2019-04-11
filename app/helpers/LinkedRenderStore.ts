import generateLRS from './generateLRS';

export const {
  serviceWorkerCommunicator,
  LRS,
  NS,
} = generateLRS();

export default LRS;
