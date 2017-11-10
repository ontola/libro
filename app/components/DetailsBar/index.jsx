/* eslint class-methods-use-this: 0 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import './DetailsBar.scss';

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
