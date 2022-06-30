import { createBasicTopologyProvider } from '../../../Core/lib/topology';
import ontola from '../../../Core/ontology/ontola';

export const omniformFieldsTopology = ontola.ns('omniformFields');

const OmniformFields = createBasicTopologyProvider(omniformFieldsTopology);

export default OmniformFields;
