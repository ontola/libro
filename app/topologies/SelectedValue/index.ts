import { TopologyProvider } from 'link-redux';

import argu from '../../ontology/argu';

export const selectedValueTopology = argu.selectedValue;

class SelectedValue extends TopologyProvider {
  constructor(props: {}) {
    super(props);

    this.topology = selectedValueTopology;
  }
}

export default SelectedValue;
