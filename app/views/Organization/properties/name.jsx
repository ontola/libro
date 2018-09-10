import { Property, linkedPropType, register } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { sidebarTopology } from '../../../topologies/Sidebar';

import './name.scss';

class OrganizationName extends React.PureComponent {
  static type = [NS.schema('Organization'), NS.argu('Page')];

  static property = [
    NS.schema('name'),
    NS.rdfs('label'),
    NS.foaf('name'),
  ];

  static topology = sidebarTopology;

  static propTypes = {
    linkedProp: linkedPropType,
  };

  render() {
    const { linkedProp } = this.props;

    return (
      <div className="OrganizationName">
        <Property label={NS.schema('image')} />
        <span className="OrganizationName__value">{linkedProp.value}</span>
      </div>
    );
  }
}

export default register(OrganizationName);
