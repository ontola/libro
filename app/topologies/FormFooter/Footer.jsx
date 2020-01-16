import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';

export const formFooterTopology = argu.formFooter;

class FormFooter extends TopologyProvider {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();

    this.topology = formFooterTopology;
    this.className = 'Form__footer';
  }
}

export default FormFooter;
