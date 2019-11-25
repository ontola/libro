import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import { CardContent } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import CardFixed from '../../topologies/Card/CardFixed';
import { popupTopology } from '../../topologies/Popup';

class ThingPopup extends React.PureComponent {
  static type = schema.Thing;

  static topology = popupTopology;

  render() {
    return (
      <CardFixed fill>
        <Property label={NS.ontola('coverPhoto')} />
        <CardContent noSpacing>
          <Property label={schema.name} />
        </CardContent>
      </CardFixed>
    );
  }
}

export default register(ThingPopup);
