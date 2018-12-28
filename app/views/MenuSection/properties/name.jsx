import { linkedPropType, register } from 'link-redux';
import React from 'react';

import MenuSectionLabel from '../../../components/MenuSectionLabel';
import { NS } from '../../../helpers/LinkedRenderStore';
import { headerTopology } from '../../../topologies/Header';

class MenuSectionName extends React.PureComponent {
  static type = NS.argu('MenuSection');

  static property = NS.schema('name');

  static topology = headerTopology;

  static propTypes = {
    linkedProp: linkedPropType,
  };

  render() {
    const { linkedProp } = this.props;

    return <MenuSectionLabel linkedProp={linkedProp} />;
  }
}

export default register(MenuSectionName);
