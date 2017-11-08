import React, { Component, PropTypes } from 'react';

import LinkItem, { linkItemPropTypes } from './menuitems/LinkItem';
import FBShareItem from './menuitems/FBShareItem';

const propTypes = {
  childProps: PropTypes.shape(linkItemPropTypes),
  done: PropTypes.func,
  type: PropTypes.oneOf(['link', 'actor', 'fb_share']).isRequired,
};

class MenuItem extends Component {
  itemType() {
    switch (this.props.type) {
      case 'fb_share':
        return FBShareItem;
      default:
      case 'link':
        return LinkItem;
    }
  }

  render() {
    const { childProps, done } = this.props;
    const ItemType = this.itemType();

    return <ItemType done={done} {...childProps} />;
  }
}

MenuItem.propTypes = propTypes;

export default MenuItem;
