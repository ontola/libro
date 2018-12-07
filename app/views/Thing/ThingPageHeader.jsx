import { Property, register } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { pageHeaderTopology } from '../../topologies/PageHeader';

class ThingPageHeader extends React.PureComponent {
  static type = NS.schema('Thing');

  static topology = pageHeaderTopology;

  render() {
    return (
      <div className="PageHeader__image-and-text-wrapper">
        <Property label={NS.schema('image')} />
        <div className="PageHeader__text">
          <Property label={NS.schema('name')} />
          <Property label={NS.schema('description')} />
        </div>
      </div>
    );
  }
}

export default register(ThingPageHeader);
