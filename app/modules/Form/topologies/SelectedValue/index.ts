import { createBasicTopologyProvider } from '../../../Kernel/lib/topology';
import { selectedValueTopology } from '../index';

const SelectedValue = createBasicTopologyProvider(selectedValueTopology);

export default SelectedValue;
