import { linkedPropType, register } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { sidebarTopology } from '../../../topologies/Sidebar';

class MenuSectionLabel extends React.PureComponent {
  static type = NS.argu('MenuSection');

  static property = NS.schema('name');

  static topology = sidebarTopology;

  static propTypes = {
    linkedProp: linkedPropType,
  };

  render() {
    const { linkedProp } = this.props;

    return (
      <div className="MenuSectionLabel" data-test="MenuSection-MenuSectionLabel">
        <div className="MenuSectionLabel__bar" />
        <div className="MenuSectionLabel__text">
          {linkedProp.value}
        </div>
        <div className="MenuSectionLabel__bar" />
      </div>
    );
  }
}

export default register(MenuSectionLabel);
