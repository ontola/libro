import { createBasicTopologyProvider } from '../../../Kernel/lib/topology';
import ontola from '../../../Kernel/ontology/ontola';

export const omniformFieldsTopology = ontola.ns('omniformFields');

const OmniformFields = createBasicTopologyProvider(omniformFieldsTopology);

export default OmniformFields;
