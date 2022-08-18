import { createTopologyProvider } from 'link-redux';

import { selectedValueTopology } from '../index';

const SelectedValue = createTopologyProvider(selectedValueTopology);

export default SelectedValue;
