/* eslint class-methods-use-this: 0 */
import './DetailsBar.scss';
import React, { Component, PropTypes } from 'react';

class DetailsBar extends Component {
  getChildContext() {
    return {
      topology: 'details',
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
  topology: PropTypes.string,
};

DetailsBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsBar;
