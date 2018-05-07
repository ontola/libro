import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  children: PropTypes.node.isRequired,
};

class FormFooter extends TopologyProvider {
  constructor() {
    super();

    this.topology = NS.argu('formFooter');
  }

  render() {
    return (
      <div className="Form__footer">
        {this.props.children}
      </div>
    );
  }
}

FormFooter.propTypes = propTypes;

export default FormFooter;
