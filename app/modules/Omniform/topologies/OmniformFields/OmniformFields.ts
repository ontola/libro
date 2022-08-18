import { createTopologyProvider } from 'link-redux';

import { omniformFieldsTopology } from '../index';

const OmniformFields = createTopologyProvider(omniformFieldsTopology);

export default OmniformFields;
