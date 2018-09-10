import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';

export const formFooterTopology = NS.argu('formFooter');

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
