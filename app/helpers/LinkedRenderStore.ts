import generateLRS from './generateLRS';
import patchRequestInitGenerator from './monkey';

export const {
  serviceWorkerCommunicator,
  /** @deprecated use the hook or hoc instead. */
  LRS,
  /** @deprecated use @ontologies/x or ontology/x instead. */
  NS,
} = generateLRS();

patchRequestInitGenerator(LRS);

export default LRS;
