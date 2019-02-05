import PropTypes from 'prop-types';
import React from 'react';

import './VerticalScroller.scss';

const propTypes = {
  children: PropTypes.node,
};

/**
 * A bar that renders its children in a single row.
 * Shows a button when the children are larger than the max width.
 * Button toggles display as single row
 * @returns {component} Component
 */
class VerticalScroller extends React.PureComponent {
  render() {
    return (
      <div className="VerticalScroller">
        <div className="VerticalScroller__scroll scrollbox theme">
          {this.props.children}
        </div>
      </div>
    );
  }
}

VerticalScroller.propTypes = propTypes;

export default VerticalScroller;
