import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import ontola from '../../ontology/ontola';
import CardFixed from '../../topologies/Card/CardFixed';
import { popupTopology } from '../../topologies/Popup';

class ThingPopup extends React.PureComponent {
  static type = schema.Thing;

  static topology = popupTopology;

  render() {
    return (
      <CardFixed fill>
        <Property label={ontola.coverPhoto} />
        <CardContent noSpacing>
          <Property label={schema.name} />
          <Property label={schema.text} />
        </CardContent>
      </CardFixed>
    );
  }
}

export default register(ThingPopup);
