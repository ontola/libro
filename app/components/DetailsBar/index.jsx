/* eslint class-methods-use-this: 0 */
import './DetailsBar.scss';
import React, { Component, PropTypes } from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

class DetailsBar extends Component {
  getChildContext() {
    return {
      topology: NS.argu('detail'),
    };
  }

  render() {
    return (
      <div className="DetailsBar">
        {this.props.children}
      </div>
    );
  }
}

DetailsBar.childContextTypes = {
  topology: PropTypes.object,
};

DetailsBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsBar;
