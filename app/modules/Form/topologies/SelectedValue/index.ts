import { createBasicTopologyProvider } from '../../../Kernel/lib/topology';
import form from '../../ontology/form';

export const selectedValueTopology = form.topologies.selectedValue;

const SelectedValue = createBasicTopologyProvider(selectedValueTopology);

export default SelectedValue;
