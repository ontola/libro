import {
  linkType,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { Breadcrumb } from '../../components/Breadcrumbs/index';
import { parentTopology } from '../../topologies/Parent';

class OrganizationParent extends React.PureComponent {
  static type = [NS.schema('Organization'), NS.argu('Page')];

  static topology = parentTopology;

  static mapDataToProps = [NS.schema('name')];

  static propTypes = {
    name: linkType,
  };

  render() {
    return (
      <React.Fragment>
        <Property label={NS.schema('isPartOf')} />
        <Breadcrumb
          data-test="Thing-parent"
          image={<Property label={NS.schema('image')} />}
          label={<Property label={NS.schema('name')} />}
          title={this.props.name.value}
        />
      </React.Fragment>
    );
  }
}

export default register(OrganizationParent);
