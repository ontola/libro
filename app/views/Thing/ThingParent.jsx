import { linkType, Property, register } from 'link-redux';
import React from 'react';

import { Breadcrumb } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { parentTopology } from '../../topologies/Parent';

class ThingParent extends React.PureComponent {
  static type = NS.schema('Thing');

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
          label={<Property label={NS.schema('name')} />}
          title={this.props.name.value}
        />
      </React.Fragment>
    );
  }
}

export default register(ThingParent);
