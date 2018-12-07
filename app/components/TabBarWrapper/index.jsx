import PropTypes from 'prop-types';
import React from 'react';

import './TabBarWrapper.scss';

const propTypes = {
  children: PropTypes.node,
};

class TabBarWrapper extends React.PureComponent {
  render() {
    return (
      <div className="TabBarWrapper">
        {this.props.children}
      </div>
    );
  }
}
TabBarWrapper.propTypes = propTypes;

export default TabBarWrapper;
