import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  children: PropTypes.node.isRequired,
};

class FormFooter extends TopologyProvider {
  constructor() {
    super();

    this.topology = NS.argu('formFooter');
    this.className = 'Form__footer';
  }
}

FormFooter.propTypes = propTypes;

export default FormFooter;
