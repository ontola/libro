import schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import React from 'react';

import MenuSectionLabel from '../../../components/MenuSectionLabel';
import { NS } from '../../../helpers/LinkedRenderStore';
import { navbarTopology } from '../../../topologies/Navbar';

class MenuSectionName extends React.PureComponent {
  static type = NS.argu('MenuSection');

  static property = schema.name;

  static topology = navbarTopology;

  static propTypes = {
    linkedProp: linkedPropType,
  };

  render() {
    const { linkedProp } = this.props;

    return <MenuSectionLabel linkedProp={linkedProp} />;
  }
}

export default register(MenuSectionName);
