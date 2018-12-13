import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import './MenuSection.scss';

class MenuSectionLabel extends React.PureComponent {
  static propTypes = {
    linkedProp: linkedPropType,
    name: PropTypes.node,
  };

  render() {
    const { linkedProp, name } = this.props;

    return (
      <div className="MenuSectionLabel" data-test="MenuSection-MenuSectionLabel">
        <div className="MenuSectionLabel__bar" />
        <div className="MenuSectionLabel__text">
          {name || linkedProp.value}
        </div>
        <div className="MenuSectionLabel__bar" />
      </div>
    );
  }
}

export default MenuSectionLabel;
